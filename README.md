# Intro

This library is for International Phone Number Validation for Angular using Directive. Based on [that](https://github.com/all2pie/angular-international-number) project.
It supports both Template driven and Reactive Forms.

[libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js) is used for the Phone Number validation.

[Demo](https://klocus.github.io/angular-intl-phone-number/)

# Usage

1. `npm i ngx-intl-phone-number`

2. Add **NgxIntlPhoneNumberModule** import to your **NgModule** like this:

   ```ts
   import { NgxIntlPhoneNumberModule } from "ngx-intl-phone-number";

   @NgModule({
     imports: [NgxIntlPhoneNumberModule],
   })
   export class AuthModule {}
   ```

3. Add the Directive to you Phone Number Input like this:

   ```html
   <input
    type="tel"
    formControlName="phoneNumber"
    intl-phone-number
    defaultCountry="PL"
    (countrySelected)="countryChanged($event)"/>
   ```

## Inputs

| Name              | Type      | Default | Description                                                                                  |
|-------------------|-----------|---------|----------------------------------------------------------------------------------------------|
| searchable        | boolean?  | true    | Allow to search for country                                                                  |
| searchPlaceHolder | string?   | null    | The Placeholder for the search input                                                         |
| defaultCountry    | string?   | null    | [Alpha 2 Country Code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)                     |
| onlyCountries     | string[]? | []      | List of manually selected countries, which will appear in the dropdown                       |
| separateDialCode  | boolean?  | false   | Use to display dial code next to the flag                                                    |

## Outputs

| Name            | Parameters       | Description                                                                        |
|-----------------|------------------|------------------------------------------------------------------------------------|
| countrySelected | country: Country | Emits whenever there is a change in country selected including the default country |
| dropdownOpened  | didOpen: boolean | Emits whenever dropdown is toggled                                                 |

## Styling

* `dropdown-open` class is added on the root element of country select when dropdown is open for custom styling

# Sources

The Countries Data was copied form this [Github Repo](https://gist.github.com/keeguon/2310008)
