import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RewardModelService} from './service/reward-model.service';
import {DateFormatService} from '../shared/service/date-format.service';
import {RewardListEntity, UserInfoEntity} from './entity/reward-entity';
import {DialogService} from '../shared/service/dialog.service';
import {StorageService} from '../shared/service/storage.service';
import {UserService} from '../shared/service/user.service';

@Component({
  selector: 'app-reward-home',
  templateUrl: './reward-home.component.html',
  styleUrls: ['./reward-home.component.scss']
})
export class RewardHomeComponent implements OnInit {
  public topicList: Array<any>;
  private pageNum: number = 1;
  public hasInit: boolean = false;
  public userId: string;

  constructor(public router: Router,
              public dialogService: DialogService,
              public storageService: StorageService,
              public userService: UserService,
              public dateFormatService: DateFormatService,
              public rewardModelService: RewardModelService) {
    this.topicList = [];


    this.userService.getUserInfo().then((userInfo: UserInfoEntity) => {

      // this.userId = this.storageService.getStorageValue('userId');

      this.storageService.localStorage.observe('userId')
        .subscribe((newValue) => {
          console.log('observe userId', newValue);
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
        let articles = data.articles || [];
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

}
