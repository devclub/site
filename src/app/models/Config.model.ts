import {Photo} from './Photo.model';
import {ConfigResources} from './ConfigResources.model';

export class Config {
  defaultLang: string;

  baseColor: string;
  lightColor: string;

  devclubText: string;
  devclubMenuUrl: string;
  devclubMenuText: string;
  hasTop: boolean;

  calendarEmbedUrl: string;
  speakerTalkFormUrl: string;

  personUrlPrefix: string;
  personDefaultImage: string;
  fileUrlPrefix: string;

  photoUrlPrefix: string;
  photos: Array<Array<Photo>>;

  seminarsUrl: string;
  meetingsUrls: { main: string; archive: string[] };
  finances: { dataUrl: string; logoUrlPrefix: string };
  team: { dataUrl: string; personUrlPrefix: string };

  googleApiKey: string;
  frontpagePlaylistId: string;
  resources: ConfigResources;
}
