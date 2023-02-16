import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CountrySelectComponent } from './country-select/country-select.component';
import { NgxIntlPhoneNumberDirective } from './ngx-intl-phone-number.directive';

@NgModule({
  declarations: [ CountrySelectComponent, NgxIntlPhoneNumberDirective ],
  imports: [ CommonModule, FormsModule ],
  providers: [],
  exports: [ NgxIntlPhoneNumberDirective ],
})
export class NgxIntlPhoneNumberModule {}
