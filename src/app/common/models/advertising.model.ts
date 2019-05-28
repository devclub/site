import {AdvertisingPrice} from './advertising-price.model';
import {AdvertisingCompany} from './advertising-company.model';

export class Advertising {
  bankName: string;
  bankNumber: string;
  bankRecipient: string;
  bankDescription: string;
  prices: AdvertisingPrice[];

  companies: AdvertisingCompany[];
}
