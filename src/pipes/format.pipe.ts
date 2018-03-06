import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe
  ) { }

  transform(input: any, format?: any): any {
    if (format === 'date') {
      return this.datePipe.transform(input, 'dd MMM yyyy');
    }
    if (format === 'currency') {
      return this.currencyPipe.transform(input, '£');
    }
    return input
  }

}