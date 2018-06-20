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
}
