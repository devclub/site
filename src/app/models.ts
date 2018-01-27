export class Lang {
  static DEFAULT = '*';
  static ET = 'et';
  static EN = 'en';
  static RU = 'ru';
}

export class LocalizedTexts extends Map<string, string> {
}

export class LocalizedTextLists extends Map<string, string[]> {
}

export class Config {
  defaultLang: string;
  navbarStyle: Map<string, string>;
  devclubText: string;
  devclubMenuUrl: string;
  devclubMenuText: string;
  blogUrl: string;
  speechAddFormUrl: string;
  bodyCssStyle: string;
  photoUrlPrefix: string;
  photoDefaultImage: string;
  fileUrlPrefix: string;
  meetingsUrls: { main: string; archive: string[] };
  sponsors: { dataUrl: string; logoUrlPrefix: string };
  team: { dataUrl: string; photoUrlPrefix: string };
}

export class MemberComplex {
  team: Array<Member>;
  thanks: Array<Member>;
}

export class Member {
  row: number;
  col: number;
  names: LocalizedTexts;
  image: string;
  url: string;
  emptyCell = false;
}

export class Sponsor {
  name: string;
  logo: string;
  url: string;
}

export class Speaker {
  names: LocalizedTexts;
  titles: LocalizedTexts;
  image: string;
  url: string;
}

export class Speech {
  youtube: string[];
  speakers: Speaker[];
  titles: LocalizedTexts;
  descr: LocalizedTextLists;
  lang: string;
}

export class Place {
  name: string;
  loc: string;
  addr: string;
  url: string;
}

export class Meeting {
  num: number;
  titles: LocalizedTexts;
  datetime: string;
  start: Date;
  event: string;
  place: Place;
  photo: string[];
  speeches: Speech[];
}
