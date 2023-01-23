import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CountrySelectComponent } from './country-select/country-select.component';
import { NgxInternationalPhoneNumberDirective } from './ngx-intl-phone-number.directive';

@NgModule({
  declarations: [ CountrySelectComponent, NgxInternationalPhoneNumberDirective ],
  imports: [ CommonModule, FormsModule ],
  providers: [],
  exports: [ NgxInternationalPhoneNumberDirective ],
})
export class NgxInternationalPhoneNumberModule {}
