import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  public checkIsLogin(): void {
    console.log('window',window)
    if (window['mysteeljs'] || (typeof window['webkit'] != 'undefined' && typeof window['webkit'].messageHandlers.getUserInfo != 'undefined')) {
      if (window['mysteeljs'])//ios老控件或安卓
      {
        let a = window['mysteeljs'].getUserInfo('false');
        let b = eval('(' + a + ')');
        console.log('a',a,'b',b)
        //判断是否已经登录
        if (b.userId && b.encCellphone) {
          // window.location.href = '';
          console.log('已登录')
        } else {
          console.log('未登录')
          window['mysteeljs'].getUserInfo('true');
        }
      } else {
        console.log('fffff')
        window['webkit'].messageHandlers.getUserInfo.postMessage('false');
      }
    }
  }

  public getUrlByApp(url, userId, mobile) {
    if (url.indexOf('?') > 0) {
      url += '&';
    } else {
      url += '?';
    }
    url += ('userId=' + userId + '&mobiles=' + mobile + '&isApp=true');

    return url;
  }


}
