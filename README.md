# Intro

This library is for International Phone Number Validation for Angular using Directive.
It supports both Template driven and Reactive Forms.

[libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js) is used for the Phone Number validation.

## Usage

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

## Sources

The Countries Data was copied form this [Github Repo](https://github.com/LucianoGanga/country-codes-list/blob/master/countriesData.js).
