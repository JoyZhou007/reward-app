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
   * @returns {string}
   * @param name
   */
  public formatName(name: any): any {
    return [...name].map((item, index, arr) => {
      return Math.floor(arr.length / 2) === index ? '*' : item;
    }).join('');
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
}
