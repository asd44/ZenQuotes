export enum Category {
  ALL = 'All',
  SUCCESS = 'Success',
  HAPPINESS = 'Happiness',
  GYM = 'Gym',
  WISDOM = 'Wisdom',
  AI_GENERATED = 'AI Spark'
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  category: Category | string;
  isAd?: boolean; // To interject ads into the feed
}

export interface AdConfig {
  active: boolean;
  frequency: number; // Show ad every X quotes
}