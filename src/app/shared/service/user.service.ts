import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  public checkIsLogin(): void {
    // let url = '/huizhan/activity/myMeeting.htm?source=1';
    // // url1 = url;
    // if (window.mysteeljs || (typeof window.webkit != 'undefined' && typeof window.webkit.messageHandlers.getUserInfo != 'undefined')) {
    //   if (window.mysteeljs)//ios老控件或安卓
    //   {
    //     let a = window.mysteeljs.getUserInfo('false');
    //     let b = eval('(' + a + ')');
    //     //判断是否已经登录
    //     if (b.userId && b.encCellphone) {
    //       url = this.getUrlByApp(url, b.userId, b.encCellphone);
    //       window.location.href = url;
    //     } else {
    //       window.mysteeljs.getUserInfo('true');
    //     }
    //   }
    //   /*else if(window.webkit.messageHandlers.getUserInfo != 'undefined'){
    //       var a = window.webkit.messageHandlers.getUserInfo.postMessage("false");
    //           var b = eval("(" + a + ")");
    //         //判断是否已经登录
    //     if (b.userId && b.encCellphone)
    //     {
    //       url = getUrlByApp(url, b.userId, b.encCellphone);
    //       window.location.href = url;
    //     } else {
    //       window.webkit.messageHandlers.getUserInfo.postMessage("true")
    //     }
    //     }*/
    //   else {
    //     window.webkit.messageHandlers.getUserInfo.postMessage('false');
    //   }
    // } else {
    //   window.location.href = url;
    // }
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
