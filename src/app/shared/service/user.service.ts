import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public storageService: StorageService) {
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
        } else { //新控件 ios
          window['webkit'].messageHandlers.getUserInfo.postMessage('false');
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
            this.storageService.setStorageValue('userId', userInfoData.userId);
            resolve(userInfoData);
          } else {
            console.log('未登录');
            this.storageService.setStorageValue('userId', '');
            resolve('');
          }
        } else { //新控件
          window['webkit'].messageHandlers.getUserInfo.postMessage('false');
          this.storageService.setStorageValue('doLogin', 0);
        }
      }
    });
  }


  /**
   * 执行登录
   * @returns {Promise<any>}
   */
  public doLogin(): Promise<any> {
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
            window['mysteeljs'].getUserInfo('true');
          }
        } else { //新控件 ios
          window['webkit'].messageHandlers.getUserInfo.postMessage('false');
          this.storageService.setStorageValue('doLogin', 1);
        }
      }
    });

  }

}
