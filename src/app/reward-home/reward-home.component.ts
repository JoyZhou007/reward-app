import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {RewardModelService} from './service/reward-model.service';
import {DateFormatService} from '../shared/service/date-format.service';
import {RewardListEntity, UserInfoEntity} from './entity/reward-entity';
import {DialogService} from '../shared/service/dialog.service';
import {StorageService} from '../shared/service/storage.service';
import {UserService} from '../shared/service/user.service';
import {TypeService} from '../shared/service/type.service';

@Component({
  selector: 'app-reward-home',
  templateUrl: './reward-home.component.html',
  styleUrls: ['./reward-home.component.scss']
})
export class RewardHomeComponent implements OnInit {
  public topicList: Array<RewardListEntity>;
  private pageNum: number = 1;
  public hasInit: boolean = false;
  public userId: string;
  private subStrLen: number = 55;

  constructor(public router: Router,
              public render: Renderer2,
              public typeService: TypeService,
              public storageService: StorageService,
              public userService: UserService,
              public rewardModelService: RewardModelService) {
    this.initScript();

    this.topicList = [];


    this.userService.getUserInfo().then((userInfo: UserInfoEntity) => {

      // this.userId = this.storageService.getStorageValue('userId');

      this.storageService.localStorage.observe('userId')
        .subscribe((newValue) => {
          this.userId = newValue;
        });
    });
  }

  ngOnInit() {
    this.getList().then(() => {
      this.hasInit = true;
    });
  }


  /**
   * 点击打开详情页面
   * @param {MouseEvent} event
   * @param articleObj
   */
  public clickOpenDetail(event: MouseEvent, articleObj: any): void {
    event.stopPropagation();
    const id = articleObj.id;
    this.router.navigate(['reward-detail', id]);
  }

  private getList(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.userId = this.storageService.getStorageValue('userId');
      console.log('this.userId', this.userId);
      let formData;
      if (this.userId) {
        formData = {
          pageNO: this.pageNum,
          userId: this.userId
        };
      } else {
        formData = {
          pageNO: this.pageNum,
        };
      }

      this.rewardModelService.getList(formData).subscribe(data => {
        let articles = [...data.articles];
        let currentTime = data.currentTime;
        if (!articles.length) {
          if (this.pageNum !== 1) {
            // this.dialogService.openTipDialog({
            //   content: '已经是最后一页'
            // });
          }
          this.pageNum = -1;
        } else {
          articles.forEach(value => {
            let tplObj = RewardListEntity.init();
            tplObj.isDoing = (value.articleTime - currentTime) > 0;

            const countdownTime = parseInt(value.articleTime) + 5 * 24 * 60 * 60 * 1000;
            let gap = countdownTime - parseInt(currentTime);
            if (gap > 0 && gap < 5 * 24 * 60 * 60 * 1000) {
              tplObj.isDoing = true;
            } else if (gap > 5 * 24 * 60 * 60 * 1000) {
              tplObj.isDoing = false;
            } else if (gap < 0) {
              tplObj.isDoing = false;
            }
            Object.assign(tplObj, value);
            if (tplObj.content.length > this.subStrLen) {
              tplObj.showSimpleContent = true;
              tplObj.simpleContent = this.typeService.substring(tplObj.content, this.subStrLen ,'...');
            }
            this.topicList.push(tplObj);
          });
        }

        resolve(data);
      }, error => {

      });
    });

  }


  @HostListener('window:scroll', ['$event'])
  doSomething(event) {
    if (this.hasInit) {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        // you're at the bottom of the page
        console.log('Bottom of page');
        if (this.pageNum !== -1) {
          this.pageNum++;
          this.getList();
        } else {
          // this.dialogService.openTipDialog({
          //   content: '已经是最后一页了'
          // });
        }
      }
    }

  }

  private initScript() {

    let oldScriptList = Array.from(document.getElementsByClassName('share-script'));
    oldScriptList.forEach(value => {
      this.render.removeChild(document.body, value);
    });

    let ele = this.render.createElement('script');
    ele.setAttribute('src', './assets/js/share-home.js');
    ele.setAttribute('class', 'share-script');
    this.render.appendChild(document.body, ele);

    let oldWx = document.getElementById('wxFunc');
    if (oldWx) {
      this.render.removeChild(document.body, oldWx);
    }

    let eleWx = this.render.createElement('script');
    eleWx.setAttribute('id', 'wxFunc');
    eleWx.setAttribute('src', '//m.steelphone.com/app/invite/jssign.ms?functionName=jssign&url=' + encodeURIComponent(location.href.split('#')[0]));
    this.render.appendChild(document.body, eleWx);
  }
}
