# Intro

This library is for International Phone Number Validation for Angular using Directive. It supports both Template driven and Reactive Forms.
You can use your existing inputs with custom styling and just add the `international-number` directive to add phone number validation.

[libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js) is used for the Phone Number validation.

[Demo](https://all2pie.github.io/angular-international-number/)

## Usage

1. `npm i ngx-international-number`

2. Add **InternationalPhoneModule** import to your **NgModule** like this:

   ```ts
   import { NgxInternationalNumberModule } from "ngx-international-number";

   @NgModule({
     imports: [NgxInternationalNumberModule],
   })
   export class AuthModule {}
   ```

3. Add the Directive to you Phone Number Input like this:

   ```html
   <input
    type="tel"
    formControlName="phoneNumber"
    international-number
    defaultCountry="PK"
    (countrySelected)="countryChanged($event)"/>
   ```

### Inputs

| Name              | Type     | Default | Description                                                                                  |
| ----------------- | -------- | ------- | -------------------------------------------------------------------------------------------- |
| searchPlaceHolder | string?  | null    | The Placeholder for the search input                                                         |
| defaultCountry    | string?  | null    | [Alpha 2 Country Code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)                     |
| hue               | string?  | 212     | [HSL color](https://www.w3schools.com/colors/colors_hsl.asp) Hue value for customizing theme |
| customScrollbar   | boolean? | true    | Use false to disable theming for scrollbar                                                   |

### Outputs

| Name            | Parameters       | Description                                                                        |
| --------------- | ---------------- | ---------------------------------------------------------------------------------- |
| countrySelected | country: Country | Emits whenever there is a change in country selected including the default country |
| dropdownOpened  | didOpen: boolean | Emits whenever dropdown is toggled                                                 |

### Styling

* `country-select` class is used for the main wrapper of select component
* `dropdown-open` class is added on the main wrapper of component when dropdown is open
* `country-select-btn` class is used for the button that opens the dropdown and is added at start of input field
* `dropdown` class is used for the dropdown

## Sources

* Flags used are from [here](https://purecatamphetamine.github.io/country-flag-icons/3x2)

* Countries data was sourced form this [repo](https://gist.github.com/keeguon/2310008)
