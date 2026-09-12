import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Lock,
  Unlock,
  Shield,
  Clock,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  EyeOff,
  RefreshCw,
  Download,
  ArrowLeft,
  Search,
  Filter,
  Users,
  Compass,
  FileText,
  Activity,
  Calendar,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';
import { MetricVisitRecord } from '../../server/metricsTracker';
import { getArchivedVisits, mergeClientArchive, ClientArchivedVisit } from '../utils/visitTracker';

interface MetricsSummary {
  range: string;
  totalVisits: number;
  uniqueVisitors: number;
  allTimeTotal?: number;
  allTimeUniqueVisitors?: number;
  activeNow: number;
  avgDurationSeconds: number;
  currentHelsinkiTime: string;
  topCountry: string;
  topCountryCode: string;
  topPage: string;
}

interface PageStat {
  path: string;
  count: number;
  uniqueVisitors: number;
  avgDuration: number;
}

interface CountryStat {
  country: string;
  countryCode: string;
  topCity: string;
  count: number;
  percentage: number;
}

interface DeviceStat {
  device: string;
  count: number;
  percentage: number;
}

interface BrowserStat {
  browser: string;
  count: number;
  percentage: number;
}

interface ReferrerStat {
  referrer: string;
  count: number;
  percentage: number;
}

interface TimelineBucket {
  label: string;
  count: number;
  uniqueVisitors: number;
  time: number;
}

interface MetricsApiResponse {
  success: boolean;
  summary: MetricsSummary;
  countsByRange?: {
    '12h': number;
    '24h': number;
    '7d': number;
    '30d': number;
    '90d': number;
    all: number;
  };
  topPages: PageStat[];
  topCountries: CountryStat[];
  topDevices: DeviceStat[];
  topBrowsers: BrowserStat[];
  topReferrers: ReferrerStat[];
  timeline: TimelineBucket[];
  recentVisits: MetricVisitRecord[];
}

interface MetricsPageProps {
  onBack: () => void;
}

// Convert country code to flag emoji
function getCountryFlag(countryCode?: string): string {
  if (!countryCode || countryCode.length !== 2 || countryCode === '--') {
    return '🌐';
  }
  if (countryCode === 'DEV') return '💻';
  try {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch {
    return '🌐';
  }
}

// Format duration into readable format: 45s, 2m 15s, etc.
function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return '0s';
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  if (mins < 60) {
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  }
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hours}h ${remainingMins}m`;
}

// Format relative time ago
function formatTimeAgo(timestamp: number): string {
  const diffSec = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (diffSec < 45) return 'Just now';
  if (diffSec < 90) return '1 min ago';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 7200) return '1h ago';
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  const days = Math.floor(diffSec / 86400);
  return days === 1 ? 'Yesterday' : `${days}d ago`;
}

export default function MetricsPage({ onBack }: MetricsPageProps) {
  // Authentication state
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('tapi_metrics_auth') === 'itowillunite';
    } catch {
      return false;
    }
  });
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Data & Filter states - default to 'all' so all historical and current visits are visible immediately
  const [timeRange, setTimeRange] = useState<'12h' | '24h' | '7d' | '30d' | '90d' | 'all'>('all');
  const [data, setData] = useState<MetricsApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [autoRefreshInterval, setAutoRefreshInterval] = useState<number>(0); // 0 = off, 15 = 15s, 30 = 30s
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('');
  const [copiedIp, setCopiedIp] = useState<string | null>(null);

  // Table search & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPage, setFilterPage] = useState<string>('ALL');
  const [pageSize, setPageSize] = useState<number>(50);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Current live Helsinki clock (Europe/Helsinki)
  const [helsinkiClock, setHelsinkiClock] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Helsinki',
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setHelsinkiClock(formatted);
      } catch {
        setHelsinkiClock(new Date().toISOString());
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch metrics data from server with local storage fallback
  const fetchMetrics = useCallback(async () => {
    const storedPw = sessionStorage.getItem('tapi_metrics_auth') || password || 'itowillunite';
    setIsLoading(true);
    setFetchError('');

    try {
      const res = await fetch(`/api/metrics/data?password=${encodeURIComponent(storedPw)}&range=${timeRange}`, {
        headers: {
          Authorization: `Bearer ${storedPw}`,
        },
      });

      if (res.status === 401) {
        setIsAuthenticated(false);
        sessionStorage.removeItem('tapi_metrics_auth');
        setAuthError('Session expired or incorrect password.');
        setIsLoading(false);
        return;
      }

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const json = (await res.json()) as MetricsApiResponse;
      if (json.success) {
        setData(json);
        setLastUpdatedTime(new Date().toLocaleTimeString());

        // Cache server visits to browser storage
        if (Array.isArray(json.recentVisits) && json.recentVisits.length > 0) {
          mergeClientArchive(json.recentVisits as any);

          // Check if local cache has visits not yet on server (e.g. after a Render container redeploy)
          const archived = getArchivedVisits();
          const serverIds = new Set(json.recentVisits.map((v) => v.id));
          const missingOnServer = archived.filter((v) => !serverIds.has(v.id));

          if (missingOnServer.length > 0) {
            // Restore missing visits to server automatically
            fetch('/api/metrics/sync', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${storedPw}`,
              },
              body: JSON.stringify({ password: storedPw, records: missingOnServer }),
            })
              .then((r) => r.json())
              .then((res) => {
                if (res.added && res.added > 0) {
                  // Re-fetch to display merged data
                  fetchMetrics();
                }
              })
              .catch(() => {});
          }
        }
      } else {
        throw new Error('Failed to load metrics data');
      }
    } catch (err) {
      console.error('Failed to fetch metrics:', err);
      // Fallback to local archive if server is unreachable
      const localVisits = getArchivedVisits();
      if (localVisits.length > 0) {
        // Build fallback client metrics from archive
        const now = Date.now();
        let cutoff = 0;
        if (timeRange === '12h') cutoff = now - 12 * 3600 * 1000;
        else if (timeRange === '24h') cutoff = now - 24 * 3600 * 1000;
        else if (timeRange === '7d') cutoff = now - 7 * 24 * 3600 * 1000;
        else if (timeRange === '30d') cutoff = now - 30 * 24 * 3600 * 1000;
        else if (timeRange === '90d') cutoff = now - 90 * 24 * 3600 * 1000;

        const filtered = cutoff === 0 ? localVisits : localVisits.filter((v) => v.timestamp >= cutoff);
        const uniqueIps = new Set(filtered.map((v) => v.ip));
        const totalDuration = filtered.reduce((acc, v) => acc + (v.durationSeconds || 0), 0);

        const pageCounts: Record<string, number> = {};
        for (const v of filtered) {
          pageCounts[v.path] = (pageCounts[v.path] || 0) + 1;
        }

        const topPages = Object.entries(pageCounts)
          .map(([path, count]) => ({ path, count, uniqueVisitors: 1, avgDuration: 0 }))
          .sort((a, b) => b.count - a.count);

        setData({
          success: true,
          summary: {
            range: timeRange,
            totalVisits: filtered.length,
            uniqueVisitors: uniqueIps.size,
            allTimeTotal: localVisits.length,
            allTimeUniqueVisitors: new Set(localVisits.map((v) => v.ip)).size,
            activeNow: 1,
            avgDurationSeconds: filtered.length > 0 ? Math.round(totalDuration / filtered.length) : 0,
            currentHelsinkiTime: new Date().toISOString(),
            topCountry: filtered[0]?.country || 'Unknown',
            topCountryCode: filtered[0]?.countryCode || '--',
            topPage: topPages[0]?.path || '/',
          },
          countsByRange: {
            '12h': localVisits.filter((v) => v.timestamp >= now - 12 * 3600 * 1000).length,
            '24h': localVisits.filter((v) => v.timestamp >= now - 24 * 3600 * 1000).length,
            '7d': localVisits.filter((v) => v.timestamp >= now - 7 * 24 * 3600 * 1000).length,
            '30d': localVisits.filter((v) => v.timestamp >= now - 30 * 24 * 3600 * 1000).length,
            '90d': localVisits.filter((v) => v.timestamp >= now - 90 * 24 * 3600 * 1000).length,
            all: localVisits.length,
          },
          topPages,
          topCountries: [],
          topDevices: [],
          topBrowsers: [],
          topReferrers: [],
          timeline: [],
          recentVisits: filtered as any,
        });
        setLastUpdatedTime('Local Offline Cache');
      } else {
        setFetchError(err instanceof Error ? err.message : 'Network error loading metrics');
      }
    } finally {
      setIsLoading(false);
    }
  }, [password, timeRange]);

  // Handle password submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsVerifying(true);

    const entered = password.trim();
    if (entered !== 'itowillunite') {
      setAuthError('Incorrect password. Access denied.');
      setIsVerifying(false);
      return;
    }

    try {
      const res = await fetch('/api/metrics/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: entered }),
      });

      if (res.ok) {
        sessionStorage.setItem('tapi_metrics_auth', entered);
        setIsAuthenticated(true);
      } else {
        setAuthError('Authentication rejected. Please check server configuration.');
      }
    } catch {
      // Fallback: if server is static, allow client verified password
      sessionStorage.setItem('tapi_metrics_auth', entered);
      setIsAuthenticated(true);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('tapi_metrics_auth');
    } catch {
      // Ignore
    }
    setIsAuthenticated(false);
    setPassword('');
  };

  // Load data when authenticated or when time range changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchMetrics();
    }
  }, [isAuthenticated, timeRange, fetchMetrics]);

  // Auto-refresh interval
  useEffect(() => {
    if (!isAuthenticated || autoRefreshInterval <= 0) return;
    const timer = setInterval(() => {
      fetchMetrics();
    }, autoRefreshInterval * 1000);
    return () => clearInterval(timer);
  }, [isAuthenticated, autoRefreshInterval, fetchMetrics]);

  // Copy IP helper
  const handleCopyIp = (ip: string) => {
    navigator.clipboard.writeText(ip);
    setCopiedIp(ip);
    setTimeout(() => setCopiedIp(null), 2000);
  };

  // Export to CSV
  const handleExportCsv = () => {
    if (!data || !data.recentVisits || data.recentVisits.length === 0) return;

    const headers = [
      'ID',
      'Helsinki Time',
      'Timestamp (UTC)',
      'IP Address',
      'Country',
      'Country Code',
      'City',
      'Page Visited',
      'Time Spent (seconds)',
      'Device',
      'Browser',
      'OS',
      'Referrer',
    ];

    const rows = data.recentVisits.map((v) => [
      `"${v.id}"`,
      `"${v.helsinkiTime}"`,
      v.timestamp,
      `"${v.ip}"`,
      `"${v.country}"`,
      `"${v.countryCode}"`,
      `"${v.city || ''}"`,
      `"${v.path}"`,
      v.durationSeconds || 0,
      `"${v.device}"`,
      `"${v.browser}"`,
      `"${v.os}"`,
      `"${(v.referrer || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tapilife_metrics_${timeRange}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered visits list
  const filteredVisits = useMemo(() => {
    if (!data?.recentVisits) return [];
    let list = data.recentVisits;

    if (filterPage !== 'ALL') {
      list = list.filter((v) => v.path === filterPage);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (v) =>
          v.ip.toLowerCase().includes(q) ||
          v.country.toLowerCase().includes(q) ||
          (v.city && v.city.toLowerCase().includes(q)) ||
          v.path.toLowerCase().includes(q) ||
          v.browser.toLowerCase().includes(q) ||
          v.device.toLowerCase().includes(q) ||
          v.helsinkiTime.toLowerCase().includes(q) ||
          (v.referrer && v.referrer.toLowerCase().includes(q))
      );
    }

    return list;
  }, [data, filterPage, searchQuery]);

  // Paginated visits
  const paginatedVisits = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredVisits.slice(start, start + pageSize);
  }, [filteredVisits, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredVisits.length / pageSize) || 1;

  // Max count in timeline for scaling chart bars
  const maxTimelineCount = useMemo(() => {
    if (!data?.timeline || data.timeline.length === 0) return 1;
    return Math.max(1, ...data.timeline.map((b) => b.count));
  }, [data]);

  // -------------------------------------------------------------
  // VIEW 1: Password Login Screen
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col justify-center items-center px-4 font-sans selection:bg-slate-700">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 mx-auto flex items-center justify-center text-slate-300">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white font-mono uppercase">
              Tapi Life Telemetry
            </h1>
            <p className="text-xs text-slate-400">
              Private visitor metrics and traffic analytics dashboard.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-lg text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Dashboard Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password..."
                  autoFocus
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium rounded-lg text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Access Metrics</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Helsinki TZ Synchronized</span>
            <button
              onClick={onBack}
              className="hover:text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Return to Site</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: Metrics Dashboard
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans selection:bg-emerald-900 selection:text-emerald-100">
      
      {/* Top Telemetry Header */}
      <header className="border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Brand & Status */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              title="Return to Tapi Life Website"
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold tracking-wider text-white uppercase">
                  TAPI LIFE / METRICS
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Visitor intelligence & traffic telemetrics
              </p>
            </div>
          </div>

          {/* Center: Live Helsinki Clock */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800/80 text-xs font-mono text-slate-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="text-[10px] text-slate-500 uppercase">Helsinki (EEST):</span>
            <span className="text-white font-medium">{helsinkiClock || 'Loading...'}</span>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Auto-Refresh Select */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs font-mono">
              <button
                onClick={() => setAutoRefreshInterval(0)}
                className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                  autoRefreshInterval === 0 ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                Manual
              </button>
              <button
                onClick={() => setAutoRefreshInterval(15)}
                className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                  autoRefreshInterval === 15 ? 'bg-emerald-950 text-emerald-400 font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                15s
              </button>
              <button
                onClick={() => setAutoRefreshInterval(30)}
                className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                  autoRefreshInterval === 30 ? 'bg-emerald-950 text-emerald-400 font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                30s
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchMetrics}
              disabled={isLoading}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
            </button>

            {/* Export CSV */}
            <button
              onClick={handleExportCsv}
              disabled={!data || !data.recentVisits?.length}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              title="Export filtered records to CSV"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">CSV</span>
            </button>

            {/* Lock / Logout */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-red-950/60 hover:border-red-800/80 text-slate-400 hover:text-red-300 transition-colors cursor-pointer"
              title="Lock & Logout"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8">

        {/* Time Range Filter Pills */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 bg-slate-900/60 border border-slate-800/80 rounded-xl">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {(
              [
                { id: '12h', label: '12 Hours' },
                { id: '24h', label: '24 Hours' },
                { id: '7d', label: '7 Days' },
                { id: '30d', label: '30 Days' },
                { id: '90d', label: '3 Months' },
                { id: 'all', label: 'All Time' },
              ] as const
            ).map((tab) => {
              const count = data?.countsByRange ? data.countsByRange[tab.id] : undefined;
              return (
                <button
                  key={tab.id}
                  onClick={() => setTimeRange(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    timeRange === tab.id
                      ? 'bg-emerald-600 text-white font-medium shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <span>{tab.label}</span>
                  {typeof count === 'number' && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        timeRange === tab.id ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-mono text-slate-500 px-2 flex items-center gap-2">
            <span>Last sync: {lastUpdatedTime || 'Just now'}</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-cyan-400 font-medium">Helsinki Timestamps</span>
          </div>
        </section>

        {/* Empty Window Banner if 0 visits in current range but allTimeTotal > 0 */}
        {data && data.summary.totalVisits === 0 && (data.summary.allTimeTotal || 0) > 0 && (
          <div className="p-4 bg-slate-900/90 border border-amber-500/30 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2.5 text-amber-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>
                No visits recorded in the selected window ({timeRange === '12h' ? '12 Hours' : timeRange === '24h' ? '24 Hours' : timeRange}).
                You have <strong>{data.summary.allTimeTotal}</strong> authentic visits logged across <strong>All Time</strong>.
              </span>
            </div>
            <button
              onClick={() => setTimeRange('all')}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium cursor-pointer shrink-0 transition-colors"
            >
              View All Time Visits ({data.summary.allTimeTotal})
            </button>
          </div>
        )}

        {/* Error Banner if any */}
        {fetchError && (
          <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span>{fetchError}</span>
            </div>
            <button
              onClick={fetchMetrics}
              className="px-2.5 py-1 bg-red-900/60 hover:bg-red-900 border border-red-700/60 rounded text-[11px] font-mono cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* 6 Key Overview Metrics Cards */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          
          {/* 1. Total Pageviews */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-mono uppercase tracking-wider">Pageviews</span>
              <Eye className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tracking-tight">
              {data?.summary.totalVisits ?? '--'}
            </div>
            <p className="text-[10px] text-slate-500 font-mono flex items-center justify-between">
              <span>In {timeRange}</span>
              {typeof data?.summary.allTimeTotal === 'number' && (
                <span className="text-slate-400 font-medium">Total: {data.summary.allTimeTotal}</span>
              )}
            </p>
          </div>

          {/* 2. Unique Visitor IPs */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-mono uppercase tracking-wider">Unique IPs</span>
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tracking-tight">
              {data?.summary.uniqueVisitors ?? '--'}
            </div>
            <p className="text-[10px] text-slate-500 font-mono flex items-center justify-between">
              <span>In {timeRange}</span>
              {typeof data?.summary.allTimeUniqueVisitors === 'number' && (
                <span className="text-slate-400 font-medium">Total: {data.summary.allTimeUniqueVisitors}</span>
              )}
            </p>
          </div>

          {/* 3. Active Right Now */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-mono uppercase tracking-wider">Active Now</span>
              <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400 tracking-tight flex items-center gap-1.5">
              <span>{data?.summary.activeNow ?? 0}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            </div>
            <p className="text-[10px] text-slate-500 font-mono">
              Seen in last 5 minutes
            </p>
          </div>

          {/* 4. Average Time on Page */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-mono uppercase tracking-wider">Avg Duration</span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tracking-tight">
              {formatDuration(data?.summary.avgDurationSeconds || 0)}
            </div>
            <p className="text-[10px] text-slate-500 font-mono">
              Average engagement / page
            </p>
          </div>

          {/* 5. Top Country */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-mono uppercase tracking-wider">Top Origin</span>
              <Globe className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-lg font-bold font-mono text-white truncate flex items-center gap-1.5">
              <span>{getCountryFlag(data?.summary.topCountryCode)}</span>
              <span className="truncate">{data?.summary.topCountry || '--'}</span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">
              Leading geographic source
            </p>
          </div>

          {/* 6. Top Visited Page */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-mono uppercase tracking-wider">Top Page</span>
              <FileText className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-base font-bold font-mono text-white truncate">
              {data?.summary.topPage || '/'}
            </div>
            <p className="text-[10px] text-slate-500 font-mono">
              Most requested route
            </p>
          </div>
        </section>

        {/* Traffic Timeline Chart (Helsinki Time) */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold font-mono text-white tracking-wide uppercase flex items-center gap-2">
                <span>Traffic Volume Timeline</span>
                <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                  Helsinki Timezone
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Visitor distribution across {timeRange === '12h' || timeRange === '24h' ? 'hours' : 'days'}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500 inline-block" />
                <span>Pageviews</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-cyan-500 inline-block" />
                <span>Unique IPs</span>
              </div>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          {data?.timeline && data.timeline.length > 0 ? (
            <div className="space-y-2 pt-2">
              <div className="h-44 flex items-end gap-1 sm:gap-2 px-2 overflow-x-auto">
                {data.timeline.map((bucket, idx) => {
                  const heightPercent = Math.max(8, (bucket.count / maxTimelineCount) * 100);
                  return (
                    <div
                      key={idx}
                      className="flex-1 min-w-[20px] flex flex-col items-center gap-1.5 group relative h-full justify-end"
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-slate-950 border border-slate-700 text-white text-[10px] font-mono px-2 py-1 rounded shadow-xl whitespace-nowrap z-20">
                        <div className="font-bold text-cyan-300">{bucket.label} (Helsinki)</div>
                        <div>Visits: {bucket.count} | Unique: {bucket.uniqueVisitors}</div>
                      </div>

                      {/* Bar columns */}
                      <div className="w-full max-w-[28px] flex items-end justify-center gap-0.5 h-full">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className="w-full bg-emerald-500/80 hover:bg-emerald-400 rounded-t transition-all"
                        />
                      </div>

                      {/* Bucket Label */}
                      <span className="text-[9px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors truncate max-w-[32px] text-center">
                        {bucket.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="h-32 flex items-center justify-center text-xs text-slate-500 font-mono">
              No timeline events recorded in this window yet.
            </div>
          )}
        </section>

        {/* 3 Column Detailed Breakdowns */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Breakdown 1: Pages Visited */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold font-mono text-white tracking-wider uppercase flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Pages Visited</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                {data?.topPages?.length || 0} routes
              </span>
            </div>

            <div className="space-y-3">
              {data?.topPages && data.topPages.length > 0 ? (
                data.topPages.map((page, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-200 font-medium truncate max-w-[150px]">
                        {page.path === '/' ? '/ (Home)' : page.path}
                      </span>
                      <div className="flex items-center gap-3 text-slate-400">
                        <span className="text-white font-bold">{page.count} views</span>
                        <span className="text-purple-300 text-[11px]">
                          avg {formatDuration(page.avgDuration)}
                        </span>
                      </div>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(
                              5,
                              data.summary.totalVisits > 0
                                ? (page.count / data.summary.totalVisits) * 100
                                : 0
                            )
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 font-mono py-4 text-center">No page traffic recorded.</p>
              )}
            </div>
          </div>

          {/* Breakdown 2: Countries & Cities */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold font-mono text-white tracking-wider uppercase flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Countries & Cities</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                {data?.topCountries?.length || 0} countries
              </span>
            </div>

            <div className="space-y-3">
              {data?.topCountries && data.topCountries.length > 0 ? (
                data.topCountries.map((c, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2 truncate max-w-[180px]">
                        <span className="text-base">{getCountryFlag(c.countryCode)}</span>
                        <span className="text-slate-200 truncate">
                          {c.country}
                          {c.topCity ? ` (${c.topCity})` : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="text-white font-bold">{c.count}</span>
                        <span className="text-[11px] text-slate-500">({c.percentage}%)</span>
                      </div>
                    </div>
                    {/* Progress */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-500 rounded-full"
                        style={{ width: `${Math.min(100, Math.max(4, c.percentage))}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 font-mono py-4 text-center">No geographic visits yet.</p>
              )}
            </div>
          </div>

          {/* Breakdown 3: Devices & Referrers */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold font-mono text-white tracking-wider uppercase flex items-center gap-2">
                <Monitor className="w-4 h-4 text-purple-400" />
                <span>Devices & Referrers</span>
              </h3>
            </div>

            <div className="space-y-4">
              {/* Devices */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  Device Hardware
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {data?.topDevices?.map((dev, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-950/60 border border-slate-800 text-center">
                      <div className="flex justify-center text-slate-400 mb-1">
                        {dev.device === 'Mobile' ? (
                          <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                        ) : dev.device === 'Tablet' ? (
                          <Tablet className="w-3.5 h-3.5 text-cyan-400" />
                        ) : (
                          <Monitor className="w-3.5 h-3.5 text-blue-400" />
                        )}
                      </div>
                      <div className="text-xs font-bold font-mono text-white">{dev.percentage}%</div>
                      <div className="text-[9px] font-mono text-slate-400">{dev.device}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Referrers */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  Traffic Sources
                </span>
                <div className="space-y-1.5">
                  {data?.topReferrers && data.topReferrers.length > 0 ? (
                    data.topReferrers.slice(0, 4).map((ref, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-300 truncate max-w-[180px]">
                          {ref.referrer.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                        </span>
                        <span className="text-slate-400 font-bold">{ref.count}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-[11px] text-slate-500 font-mono">Direct / Organic navigation</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed IP Log Table */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
          
          {/* Table Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-sm font-bold font-mono text-white tracking-wide uppercase flex items-center gap-2">
                <span>Detailed Visitor Records</span>
                <span className="text-[11px] font-normal px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {filteredVisits.length} entries
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Every IP visit with Helsinki timestamps, duration, and client details
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Search input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search IP, Country, Page..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 w-44 sm:w-56"
                />
              </div>

              {/* Route filter */}
              <select
                value={filterPage}
                onChange={(e) => {
                  setFilterPage(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="ALL">All Pages</option>
                <option value="/">/ (Home)</option>
                <option value="/about">/about</option>
                <option value="/essays">/essays</option>
                <option value="/metrics">/metrics</option>
              </select>

              {/* Page size */}
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value={25}>25 / page</option>
                <option value={50}>50 / page</option>
                <option value={100}>100 / page</option>
                <option value={500}>All</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-3">Helsinki Time</th>
                  <th className="py-3 px-3">IP Address</th>
                  <th className="py-3 px-3">Country / City</th>
                  <th className="py-3 px-3">Page Visited</th>
                  <th className="py-3 px-3">Time Spent</th>
                  <th className="py-3 px-3">Device / OS</th>
                  <th className="py-3 px-3">Referrer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {paginatedVisits.length > 0 ? (
                  paginatedVisits.map((v) => {
                    const isCopied = copiedIp === v.ip;
                    return (
                      <tr
                        key={v.id}
                        className="hover:bg-slate-800/40 transition-colors group"
                      >
                        {/* Helsinki Time */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="text-slate-200 font-medium">{v.helsinkiTime}</div>
                          <div className="text-[10px] text-slate-500">{formatTimeAgo(v.timestamp)}</div>
                        </td>

                        {/* IP Address */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span className="text-cyan-300 font-semibold">{v.ip}</span>
                            <button
                              onClick={() => handleCopyIp(v.ip)}
                              title="Copy IP"
                              className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white cursor-pointer"
                            >
                              {isCopied ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </td>

                        {/* Country / City */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">{getCountryFlag(v.countryCode)}</span>
                            <span className="text-slate-200">
                              {v.country}
                              {v.city ? `, ${v.city}` : ''}
                            </span>
                          </div>
                        </td>

                        {/* Page Visited */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300 font-medium border border-slate-700/60">
                            {v.path}
                          </span>
                        </td>

                        {/* Time Spent on Page */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-purple-400 shrink-0" />
                            <span className="text-slate-200 font-bold">
                              {formatDuration(v.durationSeconds)}
                            </span>
                            {v.durationSeconds === 0 && (
                              <span className="text-[10px] text-slate-500">(&lt;10s)</span>
                            )}
                          </div>
                        </td>

                        {/* Device / Browser / OS */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="text-slate-300">
                            {v.browser} on {v.os}
                          </div>
                          <div className="text-[10px] text-slate-500">{v.device}</div>
                        </td>

                        {/* Referrer */}
                        <td className="py-3 px-3 whitespace-nowrap text-slate-400 max-w-[150px] truncate" title={v.referrer}>
                          {v.referrer || 'Direct'}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500 font-mono">
                      No visit records match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-mono text-slate-400">
              <div>
                Page {currentPage} of {totalPages} ({filteredVisits.length} total visits)
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1 rounded bg-slate-950 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 transition-colors cursor-pointer"
                >
                  Previous
                </button>
                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1 rounded bg-slate-950 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </section>

      </main>

      {/* Footer bar */}
      <footer className="border-t border-slate-800 bg-[#0F172A] py-6 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p>Tapi Life Private Analytics — Secure password protected telemetry</p>
          <p className="text-[10px] text-slate-600">
            Timezone Europe/Helsinki • Data retained up to 90 days • Zero external advertising trackers
          </p>
        </div>
      </footer>

    </div>
  );
}
