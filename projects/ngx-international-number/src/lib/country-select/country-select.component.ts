import {
  Component,
  ElementRef,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { countries, Country } from '../country-data';
import { CountryCode } from 'libphonenumber-js';
import { InternationalNumberDirective } from '../ngx-international-number.directive';

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
  public showList: boolean = false;
  public customScrollbar: boolean = true;
  private _countries: Country[] = countries;
  public countryCodesFilter: CountryCode[] = [];
  public search: string = '';
  public searchable?: boolean;
  public searchPlaceHolder?: string;

  public directiveRef?: InternationalNumberDirective;

  constructor(private ref: ElementRef) {}

  ngOnInit(): void {}

  set countries(countriesList: Country[]) {
    this._countries = countriesList;
  }

  get countries(): Country[] {
    if (this.countryCodesFilter.length) {
      return this._countries.filter((country) =>
        this.countryCodesFilter.includes(country.code)
      );
    }
    return this._countries;
  }

  setCountry(code: CountryCode, country?: Country) {
    if (!country) {
      country = this._countries.find((country) => country.code === code);
    }
    this.selectedCountry = country;
    this.countries = countries;
    this.showList = false;

    this.directiveRef?.countrySelected.emit(country);
    this.directiveRef?.control?.updateValueAndValidity();

    return country;
  }

  documentClick(event: MouseEvent) {
    // Outside Click
    if (!this.ref.nativeElement.contains(event.target)) {
      this.showList = false;
    }
  }

  toggleDropdown() {
    this.showList = !this.showList;
    this.directiveRef?.dropdownOpened.emit(this.showList);
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
