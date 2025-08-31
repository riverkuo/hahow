export interface HeroItem {
  id: string;
  name: string;
  image: string;
}

export type HeroList = HeroItem[];

export interface HeroProfile {
  str: number;
  int: number;
  agi: number;
  luk: number;
}
