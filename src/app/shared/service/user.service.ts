import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  /**
   * 判断是否登录
   * @returns {Promise<any>}
   */
  public checkIsLogin(): Promise<any> {
    console.log('window', window);
    return new Promise((resolve, reject) => {
      let userInfoJson;
      let userInfoData;
      if (window['mysteeljs'] || (typeof window['webkit'] != 'undefined' && typeof window['webkit'].messageHandlers.getUserInfo != 'undefined')) {
        if (window['mysteeljs'])//ios老控件或安卓
        {
          userInfoJson = window['mysteeljs'].getUserInfo('false');
          userInfoData = JSON.parse(userInfoJson) || '';
          console.log('旧的userInfoJson', userInfoJson, 'userData', userInfoData);
          //判断是否已经登录
          if (userInfoData && userInfoData.userId && userInfoData.encCellphone) {
            console.log('已登录');
            resolve(userInfoData);
          } else {
            console.log('未登录');
            window['mysteeljs'].getUserInfo('true');
          }
        } else { //新控件
          userInfoJson = window['webkit'].messageHandlers.getUserInfo.postMessage('false');
          userInfoData = JSON.parse(userInfoJson) || '';
          console.log('新的userInfoJson', userInfoJson, 'userInfoData', userInfoData);
          if (userInfoJson && userInfoData && userInfoJson.userId && userInfoJson.encCellphone) {
            console.log('已登录');
            resolve(userInfoData);
          } else {
            console.log('未登录');
            window['webkit'].messageHandlers.getUserInfo.postMessage('true');
          }

        }
      }
    });

  }

  /**
   * 获取用户信息
   * @returns {Promise<any>}
   */
  public getUserInfo() {
    return new Promise((resolve, reject) => {
      let userInfoJson;
      let userInfoData;
      if (window['mysteeljs'] || (typeof window['webkit'] != 'undefined' && typeof window['webkit'].messageHandlers.getUserInfo != 'undefined')) {
        if (window['mysteeljs'])//ios老控件或安卓
        {
          userInfoJson = window['mysteeljs'].getUserInfo('false');
          userInfoData = JSON.parse(userInfoJson) || '';
          //判断是否已经登录
          if (userInfoData && userInfoData.userId && userInfoData.encCellphone) {
            console.log('已登录');
            resolve(userInfoData);
          } else {
            console.log('未登录');
            resolve('');
          }
        } else { //新控件
          userInfoJson = window['webkit'].messageHandlers.getUserInfo.postMessage('false');
          userInfoData = JSON.parse(userInfoJson) || '';
          if (userInfoJson && userInfoData && userInfoJson.userId && userInfoJson.encCellphone) {
            console.log('已登录');
            resolve(userInfoData);
          } else {
            console.log('未登录');
            resolve('');
          }

        }
      }
    });
  }


}
