import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor() {
  }

  public substring(str: string, len: number, flow: string = '...') {
    if (!str) return '';
    str = str.toString();
    let newStr = '',
      strLength = str.replace(/[^\x00-\xff]/g, '**').length;

    if (strLength <= len + (strLength % 2 == 0 ? 2 : 1)) return str;

    for (let i = 0, newLength = 0, singleChar; i < strLength; i++) {
      singleChar = str.charAt(i).toString();
      if (singleChar.match(/[^\x00-\xff]/g) != null) newLength += 2;
      else newLength++;

      if (newLength > len) break;
      newStr += singleChar;
    }

    if (strLength > len) newStr = newStr + flow;
    return newStr;
  }

  /**
   * 手机号码中间部分替换成星号
   * @param phone
   * @returns {string}
   */
  public formatPhone(phone: any): string {
    if (typeof phone == 'number') {
      phone = phone.toString();
    }
    return phone.substr(0, 3) + '****' + phone.substr(7, 11);
  }

  /**
   * 名字中间部分替换成星号
   * @param {string} str
   * @returns {string}
   */
  public formatName(str: string): string {
    return new Array(str.length).join('*') + str.substr(-1);
  }
}
