import {
  ComponentFactory,
  ComponentFactoryResolver,
  EventEmitter,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CountryCode, parsePhoneNumber, PhoneNumber } from 'libphonenumber-js/mobile';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { CountrySelectComponent } from './country-select/country-select.component';
import { Country } from './country-data';

@Directive({
  selector: '[intl-phone-number]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NgxIntlPhoneNumberDirective,
      multi: true,
    },
  ],
})
export class NgxIntlPhoneNumberDirective implements Validator, OnInit {
  @Input() defaultCountry?: CountryCode;
  @Input() onlyCountries?: CountryCode[];
  @Input() separateDialCode: boolean = false;
  @Input() searchable: boolean = true;
  @Input() searchPlaceHolder?: string;
  @Input() strictValidation: boolean = false;
  @Output() countrySelected = new EventEmitter<Country>();
  @Output() dropdownOpened = new EventEmitter<boolean>();
  private countrySelectComponent: CountrySelectComponent;
  public control?: AbstractControl;

  constructor(
    inputRef: ElementRef,
    view: ViewContainerRef,
    factoryResolver: ComponentFactoryResolver
  ) {
    const compFactory: ComponentFactory<CountrySelectComponent> = factoryResolver.resolveComponentFactory(
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
    this.countrySelectComponent.separateDialCode = this.separateDialCode;
    this.countrySelectComponent.searchable = this.searchable;
    this.countrySelectComponent.searchPlaceHolder = this.searchPlaceHolder;

    if (this.defaultCountry) {
      this.countrySelectComponent.setCountry(this.defaultCountry);
    }

    if (this.onlyCountries) {
      this.countrySelectComponent.countryCodesFilter = this.onlyCountries;
    }
  }

  validate(control: AbstractControl) {
    this.control = control;

    if (control.value) {
      try {
        const number: PhoneNumber = parsePhoneNumber(
          control.value,
          this.countrySelectComponent.selectedCountry?.code
        );

        if (number.country && this.countrySelectComponent.selectedCountry?.code !== number.country) {
          this.countrySelectComponent.setCountry(number.country);
        }

        if (this.separateDialCode) {
          if (number.nationalNumber && control.value !== number.nationalNumber) {
            control.setValue(number.nationalNumber);
          }
        }
        else {
          if (number.number && control.value !== number.number) {
            control.setValue(number.number);
          }
        }

        if ((this.strictValidation ? !number.isValid() : !number.isPossible())) {
          return { invalidPhoneNumber: true };
        }
      } catch (error) {
        return { invalidPhoneNumber: true };
      }
    }

    return null;
  }
}
