import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor() {
  }

  /**
   *
   * @param {string} str
   * @param {number} len
   * @param {string} flow
   * @returns {string}
   */
  // public substring(str: string, len: number, flow: string = '...') {
  //   if (!str) return '';
  //   str = str.toString();
  //   let newStr = '',
  //     strLength = str.replace(/[^\x00-\xff]/g, '**').length;
  //
  //   if (strLength <= len + (strLength % 2 == 0 ? 2 : 1)) return str;
  //
  //   for (let i = 0, newLength = 0, singleChar; i < strLength; i++) {
  //     singleChar = str.charAt(i).toString();
  //     if (singleChar.match(/[^\x00-\xff]/g) != null) newLength += 2;
  //     else newLength++;
  //
  //     if (newLength > len) break;
  //     newStr += singleChar;
  //   }
  //
  //   if (strLength > len) newStr = newStr + flow;
  //   return newStr;
  // }

  public substring(str: string, len: number, flow: string = '') {
    return str.substr(0, len) + flow;
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
   * @returns {string}
   * @param name
   */
  // public formatName(name: any): any {
  //   console.log('[...name]');
  //   return name.split('').map((item, index, arr) => {
  //     return Math.floor(arr.length / 2) === index ? '*' : item;
  //   }).join('');
  // }

  public formatName(name: any): string {
    let newStr;
    if (name.length === 2) {
      newStr = name.substr(0, 1) + '*';
    } else if (name.length > 2) {
      let char = '';
      for (let i = 0, len = name.length - 2; i < len; i++) {
        char += '*';
      }
      newStr = name.substr(0, 1) + char + name.substr(-1, 1);
    } else {
      newStr = name;
    }

    return newStr;
  }

  /**
   * 节流
   * @param fn
   * @param time
   * @returns {(...args) => undefined}
   */
  public ttrottle(fn, time) {
    let isNeedInvoke = true;
    return function (...args) {
      if (!isNeedInvoke) {
        return;
      }
      const context = this;
      const _arguments = args;
      isNeedInvoke = false;
      setTimeout(() => {
        fn.apply(context, _arguments);
        isNeedInvoke = true;
      }, time);
    };
  };

  /**
   * 防抖
   * @param fn
   * @param time
   * @returns {(...args) => void}
   */
  public debounce(fn, time) {
    // 设置定时器
    let timer;
    return function (...args) {
      // 清空上一次的定时器
      clearTimeout(timer);
      // 获取执行环境的上下文
      const context = this;
      const _arguments = args;
      timer = setTimeout(() => {
        fn.apply(context, _arguments);
      }, time);
    };
  };


  /**
   * 获取中英文混合字符串定义长度
   */
  public getStringLocaleLen(text: any) {
    if (!text) {
      return 0;
    }
    let cnCharLen = 3;
    let textLen: number = 0;
    // 英文
    let regExpEn = /[a-z|A-Z|0-9]|[`|!|@|#|$|%|^|&|*|(|)|\-|_|+|{|}|<|>|?|,|.|/|[|'|;|:|"|\\]/gi;
    // 换行
    let regExpSpace: any = /\s/g;
    for (let i = 0; i < text.length; i++) {
      regExpEn.lastIndex = 0;
      if (regExpEn.test(text[i]) || regExpSpace.test(text[i])) {
        textLen += 1;
      } else {
        textLen += cnCharLen;
      }
    }
    return textLen;
  }

  /**
   * 按照中英文混合长度截取字符串
   */
  localeSubString(text: any, start: number, maxLen: number) {
    if (!text) {
      return '';
    }
    if (start > text.length) {
      return '';
    }
    let cnCharLen = 3;
    let textLen: number = 0;
    let returnStr: string = '';
    // 英文
    let regExpEn = /[a-z|A-Z|0-9]|[`|!|@|#|$|%|^|&|*|(|)|\-|_|+|{|}|<|>|?|,|.|/|[|'|;|:|"|\\]/gi;
    // 换行
    let regExpSpace: any = /\s/g;
    for (let i = start; i < text.length; i++) {
      regExpEn.lastIndex = 0;
      if (regExpEn.test(text[i]) || regExpSpace.test(text[i])) {
        textLen += 1;
      } else {
        textLen += cnCharLen;
      }
      if (textLen > maxLen) {
        break;
      } else {
        returnStr += text[i];
      }
    }
    return returnStr;
  }

  /**
   * 数组去重
   * @param a
   * @returns {any[]}
   */
  public uniq(a: Array<any>): any[] {
    return Array.from(new Set(a));
  }

  /**
   * 判断奇数
   * @param {number} number
   * @returns {boolean}
   */
  public isOddNumber(number: number): boolean {
    return !!(number % 2);
  }
}
