import { Component, OnInit } from '@angular/core';
import { CampsStorageService } from './search/camps-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Dispersal';

  constructor(private campsStorageService: CampsStorageService) {}

  ngOnInit() {
    if (localStorage.getItem('preferences')) {
      this.campsStorageService.preferences = JSON.parse(
        localStorage.getItem('preferences')
      );
    }
  }
}
