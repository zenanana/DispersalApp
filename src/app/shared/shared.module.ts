import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [DropdownDirective, LoadingSpinnerComponent],

  imports: [],

  exports: [DropdownDirective, LoadingSpinnerComponent],

  entryComponents: [],
})
export class SharedModule {}
