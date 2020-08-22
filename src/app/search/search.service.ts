import { Injectable } from '@angular/core';
import { CampsStorageService } from './camps-storage.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  resultsSubject = new Subject<string[]>();
  errorsSubject = new Subject<string[]>();
  date: Date = new Date();

  constructor(
    private campsStorageService: CampsStorageService,
    private http: HttpClient
  ) {}

  handleResponse(response, sector: string[], order: string): void {
    let returnArr = [];
    let errorArr = [];
    for (let i = 0; i < sector.length; i++) {
      if (response.rows[0].elements[i].status === 'OK') {
        returnArr.push([
          sector[i],
          Math.floor(response.rows[0].elements[i].duration.value / 60),
        ]);
      } else {
        errorArr.push([sector[i], response.rows[0].elements[i].status]);
      }
    }
    returnArr.sort((a, b) => {
      if (order === 'Ascending') {
        return a[1] - b[1];
      } else {
        return b[1] - a[1];
      }
    });
    this.resultsSubject.next(returnArr);
    this.errorsSubject.next(errorArr);
  }

  search(postal: string): void {
    console.log('searching');

    const origin = postal;
    let destinations = [];
    if (this.campsStorageService.preferences.sector === 'Western') {
      destinations = this.campsStorageService.Western;
    } else if (this.campsStorageService.preferences.sector === 'Eastern') {
      destinations = this.campsStorageService.Eastern;
    } else if (this.campsStorageService.preferences.sector === 'Central') {
      destinations = this.campsStorageService.Central;
    }

    console.log(destinations);

    const callback = (response, status) => {
      if (status == 'OK') {
        console.log(
          this.handleResponse(
            response,
            destinations,
            this.campsStorageService.preferences.order
          )
        );
      }
    };
    console.log(
      new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        this.date.getDay(),
        8,
        0,
        0,
        0
      )
    );

    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: destinations,
        travelMode: google.maps.TravelMode.TRANSIT,
        transitOptions: {
          departureTime: new Date(
            this.date.getFullYear(),
            this.date.getMonth() + 1,
            this.date.getDay(),
            8,
            0,
            0,
            0
          ),
        },
      },
      callback
    );

    console.log('finished searching');
  }
}
