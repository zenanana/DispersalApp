import { Component, OnInit } from '@angular/core';
import { CampsStorageService } from '../search/camps-storage.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  settingsSaved: boolean = false;

  constructor(private campsStorageService: CampsStorageService) {}

  ngOnInit(): void {
    this.settingsForm = new FormGroup({
      sector: new FormControl(this.campsStorageService.preferences.sector),
      order: new FormControl(this.campsStorageService.preferences.order),
    });
  }

  onSubmit() {
    this.campsStorageService.updatePreferences(
      this.settingsForm.value.order,
      this.settingsForm.value.sector
    );
    localStorage.setItem(
      'preferences',
      JSON.stringify({
        order: this.settingsForm.value.order,
        sector: this.settingsForm.value.sector,
      })
    );
    this.settingsSaved = true;
    setTimeout(() => (this.settingsSaved = false), 1000);
  }
}
