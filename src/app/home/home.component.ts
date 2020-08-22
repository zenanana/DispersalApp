import { Component, OnInit, OnDestroy, ApplicationRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from '../search/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  resultsSubscription: Subscription;
  errorsSubscription: Subscription;
  public resultsArr = [];
  public errorsArr = [];
  isLoading: boolean = false;

  constructor(
    private searchService: SearchService,
    private applicationRef: ApplicationRef
  ) {}

  ngOnInit() {
    this.resultsSubscription = this.searchService.resultsSubject.subscribe(
      (results) => {
        this.resultsArr = results;
        this.isLoading = false;
        this.applicationRef.tick();
      }
    );
    this.errorsSubscription = this.searchService.errorsSubject.subscribe(
      (errors) => {
        this.errorsArr = errors;
        this.isLoading = false;
        this.applicationRef.tick();
      }
    );
    this.searchForm = new FormGroup({
      postal: new FormControl(null, [
        Validators.required,
        this.postalValidator,
      ]),
    });
  }

  postalValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value && control.value.toString().length === 6) {
      return null;
    } else {
      return { postalIsForbidden: true };
    }
  }

  onSubmit() {
    this.resultsArr = [];
    this.errorsArr = [];
    this.isLoading = true;
    console.log(this.searchForm.value);
    this.searchService.search(this.searchForm.value.postal);
  }

  ngOnDestroy() {
    this.resultsSubscription.unsubscribe();
  }
}
