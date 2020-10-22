
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Constants } from '../util/Constants';

@Pipe({
  name: 'DateTimeFormatPipe'
})
export class DateTimeFormatPipePipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if(!value) return;

    if(value.length == null) {
      return super.transform(value, Constants.DATE_FMT );      
    }
    return value.split(' ')[0];

  }
}