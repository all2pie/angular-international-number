import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, NG_VALIDATORS } from '@angular/forms';
import { CountrySelectComponent } from './country-select/country-select.component';
import { InternationalNumberDirective } from './ngx-international-number.directive';

@NgModule({
  declarations: [CountrySelectComponent, InternationalNumberDirective],
  imports: [CommonModule, FormsModule],
  providers: [],
  exports: [InternationalNumberDirective],
})
export class NgxInternationalNumberModule {}
