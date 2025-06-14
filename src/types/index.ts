export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface DailyQuote {
  text: string;
  author: string;
  source?: string;
}

export type Hadith = {
  id: number;
  text_ar: string;
  text_fr: string;
  source: string;
  tags: string[];
  themes: string[];
};

export interface City {
  name: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}