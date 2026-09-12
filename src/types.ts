export type Language = 'en' | 'ja' | 'fi';

export interface CharacterItem {
  id: string;
  nameEn: string;
  nameJa: string;
  nameFi?: string;
  color: string;
  borderColor: string;
  iconBg: string;
  roleEn: string;
  roleJa: string;
  roleFi?: string;
  descEn: string;
  descJa: string;
  descFi?: string;
  likesEn: string;
  likesJa: string;
  likesFi?: string;
  emoji: string;
}

export interface VideoEpisode {
  id: number;
  titleEn: string;
  titleJa: string;
  titleFi?: string;
  descriptionEn: string;
  descriptionJa: string;
  descriptionFi?: string;
  icon: string;
  duration: string;
  animatedScenario: string;
}

export interface GalleryItem {
  id: string;
  type: 'drawing' | 'comic' | 'photo' | 'merch';
  titleEn: string;
  titleJa: string;
  titleFi?: string;
  imageUrl?: string;
  svgPlaceholder?: string;
  descEn: string;
  descJa: string;
  descFi?: string;
}

export interface MerchItem {
  id: string;
  nameEn: string;
  nameJa: string;
  nameFi?: string;
  price: string;
  descriptionEn: string;
  descriptionJa: string;
  descriptionFi?: string;
  imageUrl?: string;
  svgId: string;
}
