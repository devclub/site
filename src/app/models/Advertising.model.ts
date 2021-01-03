import {AdvertisingPrice} from './AdvertisingPrice.model';
import {AdvertisingCompany} from './AdvertisingCompany.model';

export class Advertising {
  bankName: string;
  bankNumber: string;
  bankRecipient: string;
  bankDescription: string;
  prices: AdvertisingPrice[];

  companies: AdvertisingCompany[];
  persons: string[];
}
