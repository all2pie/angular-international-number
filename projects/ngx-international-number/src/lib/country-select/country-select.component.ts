import {
  Component,
  ElementRef,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { countries, Country } from '../country-data';
import { CountryCode } from 'libphonenumber-js';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '(document:click)': 'documentClick($event)',
  },
})
export class CountrySelectComponent implements OnInit {
  public selectedCountry?: Country;
  public showList = false;
  public countries = countries;
  public search = '';

  constructor(private ref: ElementRef) {}

  ngOnInit(): void {}

  setCountry(code: CountryCode, country?: Country) {
    if (!country) {
      country = this.countries.find((country) => country.code === code);
    }
    this.selectedCountry = country;
    this.countries = countries;
    this.showList = false;

    return country;
  }

  documentClick(event: MouseEvent) {
    // Outside Click
    if (!this.ref.nativeElement.contains(event.target)) {
      this.showList = false;
    }
  }

  filterCountries(search: string) {
    if (!search) {
      this.countries = countries;
      return;
    }

    search = search.toLowerCase();

    this.countries = countries.filter((country) =>
      country.name.toLowerCase().includes(search)
    );
  }
}
