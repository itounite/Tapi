export type Language = 'en' | 'ja';

export interface CharacterItem {
  id: string;
  nameEn: string;
  nameJa: string;
  color: string;
  borderColor: string;
  iconBg: string;
  roleEn: string;
  roleJa: string;
  descEn: string;
  descJa: string;
  likesEn: string;
  likesJa: string;
  emoji: string;
}

export interface VideoEpisode {
  id: number;
  titleEn: string;
  titleJa: string;
  descriptionEn: string;
  descriptionJa: string;
  icon: string;
  duration: string;
  animatedScenario: string; // Used to trigger different dynamic play animations
}

export interface GalleryItem {
  id: string;
  type: 'drawing' | 'comic' | 'photo' | 'merch';
  titleEn: string;
  titleJa: string;
  imageUrl?: string;
  svgPlaceholder?: string; // fallback or decorative SVG name
  descEn: string;
  descJa: string;
}

export interface MerchItem {
  id: string;
  nameEn: string;
  nameJa: string;
  price: string;
  descriptionEn: string;
  descriptionJa: string;
  imageUrl?: string;
  svgId: string;
}
