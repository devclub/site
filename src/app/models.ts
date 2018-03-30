export class Lang {
  static DEFAULT = '*';
  static ET = 'et';
  static EN = 'en';
  static RU = 'ru';
}

export class BestGroupBy {
  static PLACE = 'PLACE';
  static SEASON = 'SEASON';
}

export class LocalizedTexts extends Map<string, string> {
}

export class LocalizedTextLists extends Map<string, string[]> {
}

export class Config {
  defaultLang: string;

  navbarStyle: Map<string, string>;
  footerStyle: Map<string, string>;

  devclubText: string;
  devclubMenuUrl: string;
  devclubMenuText: string;
  blogUrl: string;
  hasTop: boolean;

  personUrlPrefix: string;
  personDefaultImage: string;
  fileUrlPrefix: string;

  photoUrlPrefix: string;
  photos: Photo[][];

  seminarsUrl: string;
  meetingsUrls: { main: string; archive: string[] };
  finances: { dataUrl: string; logoUrlPrefix: string };
  team: { dataUrl: string; personUrlPrefix: string };
}

export class Photo {
  main: string;
  mainUrl: string;
  small: string;
  smallUrl: string;
  texts: LocalizedTexts;
}

export class Team {
  logos: string;
  team: Array<Member>;
  thanks: Array<Member>;
}

export class Member {
  row: number;
  col: number;
  names: LocalizedTexts;
  image: string;
  imageUrl: string;
  url: string;
  emptyCell = false;
}

export class Advertising {
  prices: AdvertisingPrice[];
  companies: AdvertisingCompany[];
}

export class AdvertisingPrice {
  month: number;
  price: number;
}

export class AdvertisingCompany {
  name: string;
  logo: string;
  logoUrl: string;
  url: string;
}

export class Speaker {
  names: LocalizedTexts;
  titles: LocalizedTexts;
  image: string;
  imageUrl: string;
  url: string;
}

export class SpeakerTabItem extends Speaker {
  date: Date;
  speechCount = 0;
  top1 = 0;
  top2 = 0;
  top3 = 0;
  topOther = 0;
}

export class Speech {
  youtube: string[];
  youtubeUrls: string[];
  speakers: Speaker[];
  titles: LocalizedTexts;
  descr: LocalizedTextLists;
  presentations: string[];
  examples: string[];
  labels: string[];
  info: string;
  lang: string;
  top: Top;
}

export class Top {
  season: number;
  place: number;
  descr: LocalizedTexts;
}

export class Place {
  name: string;
  loc: string;
  addr: string;
  url: string;
}

export class MeetingFilter {
  public bestGroupBy = BestGroupBy.PLACE;
  public season: number;
  public speaker: string;
  public texts: string;
  public label: string;
}

export class Meeting {
  hidden: boolean;
  num: number;
  season: number;
  titles: LocalizedTexts;
  datetime: string;
  start: Date;
  event: string;
  place: Place;
  photo: string[];
  speeches: Speech[];
}

export class Seminar {
  datetime: string;
  start: Date;
  duration_h: number;
  places: number;
  place: Place;
  url: string[];
  speakers: Speaker[];
  lang: string;
  titles: LocalizedTexts;
  descr: LocalizedTextLists;
  prices: LocalizedTexts;
  info: LocalizedTexts;
}
