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

  personUrlPrefix: string;
  personDefaultImage: string;
  fileUrlPrefix: string;

  photoUrlPrefix: string;
  photos: Photo[][];

  seminarsUrl: string;
  meetingsUrls: { main: string; archive: string[] };
  finances: { dataUrl: string; logoUrlPrefix: string };
  team: { dataUrl: string; personUrlPrefix: string };

  googleApiKey: string;
  resources: ConfigResources;
}
