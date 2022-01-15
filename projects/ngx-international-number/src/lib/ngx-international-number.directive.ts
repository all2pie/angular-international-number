import {
  ComponentFactoryResolver,
  EventEmitter,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js/mobile';
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
  @Input() defaultCountry?: CountryCode;
  @Input() searchPlaceHolder?: string;
  @Input() customScrollbar: boolean = true;
  @Input() hue?: string;
  @Output() countrySelected = new EventEmitter<Country>();
  @Output() dropdownOpened = new EventEmitter<Boolean>();
  private countrySelectComponent: CountrySelectComponent;
  public control?: AbstractControl;

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

    this.countrySelectComponent.directiveRef = this;
  }

  ngOnInit() {
    this.countrySelectComponent.searchPlaceHolder = this.searchPlaceHolder;

    this.countrySelectComponent.customScrollbar = this.customScrollbar;

    if (this.hue) {
      document.documentElement.style.setProperty('--hue', this.hue);
    }

    if (this.defaultCountry) {
      this.countrySelectComponent.setCountry(this.defaultCountry);
    }
  }

  validate(control: AbstractControl) {
    this.control = control;

    const validationError = { invalidPhoneNumber: true };

    if (!control.value) {
      return validationError;
    }

    try {
      const number = parsePhoneNumber(
        control.value,
        this.countrySelectComponent.selectedCountry?.code
      );

      if (
        number.country &&
        this.countrySelectComponent.selectedCountry?.code !== number.country
      ) {
        this.countrySelectComponent.setCountry(number.country);
      }

      if (number.number && control.value !== number.number) {
        control.setValue(number.number);
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
