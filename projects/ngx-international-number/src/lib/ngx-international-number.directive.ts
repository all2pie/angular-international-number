import {
  ComponentFactoryResolver,
  EventEmitter,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { CountrySelectComponent } from './country-select/country-select.component';
import { Country } from './country-data';

@Directive({
  selector: '[international-number]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: InternationalNumberDirective,
      multi: true,
    },
  ],
})
export class InternationalNumberDirective implements Validator, OnInit {
  @Input('defaultCountry') defaultCountry?: CountryCode;
  @Output() countrySelected = new EventEmitter<Country>();
  private countrySelectComponent: CountrySelectComponent;

  constructor(
    inputRef: ElementRef,
    view: ViewContainerRef,
    factoryResolver: ComponentFactoryResolver
  ) {
    const compFactory = factoryResolver.resolveComponentFactory(
      CountrySelectComponent
    );

    this.countrySelectComponent = view.createComponent(
      compFactory,
      undefined,
      view.injector,
      [[inputRef.nativeElement]]
    ).instance;

    const setCountryFunction = this.countrySelectComponent.setCountry.bind(
      this.countrySelectComponent
    );

    this.countrySelectComponent.setCountry = (
      code: CountryCode,
      country?: Country
    ) => {
      const selectedCountry = setCountryFunction(code, country);
      this.countrySelected.emit(selectedCountry);
      return selectedCountry;
    };
  }

  ngOnInit() {
    if (this.defaultCountry) {
      this.countrySelectComponent.setCountry(this.defaultCountry);
    }
  }

  validate(control: AbstractControl) {
    const validationError = { invalidPhoneNumber: true };

    if (!control.value) {
      return validationError;
    }

    try {
      const number = parsePhoneNumber(
        control.value,
        this.countrySelectComponent.selectedCountry?.countryCode
      );

      if (
        number.country &&
        this.countrySelectComponent.selectedCountry?.countryCode !==
          number.country
      ) {
        this.countrySelectComponent.setCountry(number.country);
      }

      if (!number.isValid()) {
        return validationError;
      }
    } catch (error) {
      return validationError;
    }

    return null;
  }
}
