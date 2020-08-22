import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CampsStorageService {
  Western: string[] = [
    'Jurong Camp 1',
    'Jurong Camp 2',
    'Pasir Laba Camp',
    'SAFTI MI',
    'Lim Chu Kang Camp 2',
    'Tengah Airbase',
    'Sungei Gedong Camp',
    'Lim Chu Kang Camp 1',
    'Keat Hong Camp',
    'Choa Chu Kang Camp',
    'Mandai West Camp',
    'Kranji Camp 2',
    'Kranji Camp 3',
    'Mowbray Camp',
  ];

  Central: string[] = [
    'Stagmont Camp',
    'Mandai Hill Camp',
    'Mandai Camp 2',
    'Sembawang Camp',
    'Dieppe Barracks Sembawang',
    'Khatib Camp',
    'Sembawang Airbase',
    'Rifle Range Road Camp',
    'Bukit Panjang Camp',
    'Hillview Camp',
    'Gombak Base',
    'HQ ADOC',
    'Clementi Camp',
    'Maju Camp',
    'CMPB',
  ];

  Eastern: string[] = [
    'Bedok Camp',
    'Changi Naval Base',
    'Paya Lebar Air Base',
    'Nee Soon Camp',
    'Nee Soon Dri Clad',
    'Seletar Camp',
    'Amoy Quee Camp',
    'Pasir Ris Camp',
    'Changi Air Base (East)',
    'Changi Air Base (West)',
    'Selarang Camp',
    'Hendon Camp',
    'SAF Ferry Terminal',
  ];

  All: string[] = this.Western.concat(this.Central, this.Eastern);

  preferences = {
    order: 'Ascending',
    sector: 'Western',
  };

  updatePreferences(order: string, sector: string) {
    this.preferences.order = order;
    this.preferences.sector = sector;
  }
}
