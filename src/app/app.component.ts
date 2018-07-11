import {Component} from '@angular/core';
import * as VConsole from 'vconsole';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';

  constructor() {
    const vConsole = new VConsole();
    this.checkBrowser();
  }


  checkBrowser() {
    let ua = navigator.userAgent.toLocaleLowerCase();
    if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
      if(ua.match(/lbbrowser/) != null) {
        console.log("猎豹");
      }else {
        console.log("IE");
      }
    } else if (ua.match(/firefox/) != null) {
      console.log("火狐");
    } else if (ua.match(/ubrowser/) != null) {
      console.log("UC");
    } else if (ua.match(/opera/) != null) {
      console.log("欧朋");
    } else if (ua.match(/bidubrowser/) != null) {
      console.log("百度");
    } else if (ua.match(/metasr/) != null) {
      console.log("搜狗");
    } else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
      console.log("QQ");
    } else if (ua.match(/maxthon/) != null) {
      console.log("遨游");
    } else if (ua.match(/chrome/) != null) {
      let is360 = this.mime("type", "application/vnd.chromium.remoting-viewer");
      if (is360) {
        console.log('360');
      } else {
        console.log("谷歌");
      }

    } else if (ua.match(/safari/) != null) {
      console.log("Safari");
    }
  }

  mime(option, value) {
    let mimeTypes = navigator.mimeTypes;
    for (let mt in mimeTypes) {
      if (mimeTypes[mt][option] == value) {
        return true;
      }
    }
    return false;
  }
}
