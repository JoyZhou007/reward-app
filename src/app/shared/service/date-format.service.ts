import {Injectable} from '@angular/core';
import * as dateFormat from 'dateformat';

@Injectable()
export class DateFormatService {
  public defaultFormat: string = 'HH:MM ddS mmm yyyy';

  constructor() {
  }

  /**
   * 将日期转为指定格式,非utc时间
   * @param date
   * @param formatString
   * @returns string
   */
  formatLocal(date: any, formatString?: string): string {
    let format = this.defaultFormat;

    if (typeof formatString !== 'undefined') {
      format = formatString;
    }
    if (typeof date === 'string') {
      date = date.replace(/-/g, '/');
    }
    return dateFormat(date, format, false);
  }
}
