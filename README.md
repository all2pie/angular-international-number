# Intro

This library is for International Phone Number Validation for Angular using Directive.
It supports both Template driven and Reactive Forms.

[libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js) is used for the Phone Number validation.

[Demo](https://all2pie.github.io/angular-international-number/)

# Usage

1. `npm i ngx-international-number`

2. Add **InternationalPhoneModule** import to your **NgModule** (where the directive is used) like this:

   ```ts
   import { NgxInternationalNumberModule } from "ngx-international-number";

   @NgModule({
     imports: [NgxInternationalNumberModule],
   })
   export class AuthModule {}
   ```

3. Add the Directive to you Phone Number Input like this:

   ```ts
   <input
    type="tel"
    formControlName="phoneNumber"
    international-number
    defaultCountry="PK"
    (countrySelected)="countryChanged($event)"/>
   ```



## Inputs

| Name              | Type                           | Default                        | Description                                                                             
| ----------------- | ------------------------------ | ------------------------------ | ------------------------------------------------------------------------ |
| defaultCountry    | string                         | null                           | [Alpha 2 Country Code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) |
| searchPlaceHolder | string                         | null                           | The Placeholder for the search input                                     |

## Outputs

| Name              | Parameters                     | Description                                                                             
| ----------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| countrySelected   | country: Country               | Emits whenever there is a change in country selected including the default country |
# Sources
Flags used are from this [Package](https://www.npmjs.com/package/country-flag-icons)
The Countries Data was copied form this [Github Repo](https://gist.github.com/keeguon/2310008).
