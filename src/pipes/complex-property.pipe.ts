import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'complexProperty'
})
export class ComplexPropertyPipe implements PipeTransform {

  constructor() {}

  transform(value: any, args?: any): any {
    return this.resolveComplexProperty(value, args);
  }

  private resolveComplexProperty(obj, property) {
    return property.split('.').reduce(function (prev, curr) {
      return prev ? prev[curr] : null;
    }, obj || self);
  }

}
