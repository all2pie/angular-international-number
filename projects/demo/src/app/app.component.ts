import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Country } from 'ngx-international-number';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public fg = new FormGroup({
    phoneNumber: new FormControl(),
  });

  countryChanged(country: Country) {
    console.log('Country Changed: ', country);
  }
}
