import {Photo} from '../../page-about/models/photo.model';
import {ConfigResources} from './config-resources.model';

export class Config {
  defaultLang: string;

  baseColor: string;
  lightColor: string;
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

  googleApiKey: string;
  resources: ConfigResources;
}
