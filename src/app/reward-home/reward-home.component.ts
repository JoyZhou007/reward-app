import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RewardModelService} from './service/reward-model.service';
import {DateFormatService} from '../shared/service/date-format.service';
import {RewardListEntity} from './entity/reward-entity';
import {DialogService} from '../shared/service/dialog.service';

@Component({
  selector: 'app-reward-home',
  templateUrl: './reward-home.component.html',
  styleUrls: ['./reward-home.component.scss']
})
export class RewardHomeComponent implements OnInit {
  public topicList: Array<any>;
  private pageNum: number = 1;
  public hasInit: boolean = false;

  constructor(public router: Router,
              public dialogService: DialogService,
              public dateFormatService: DateFormatService,
              public rewardModelService: RewardModelService) {
    this.topicList = [];
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
      let formData = {
        pageNO: this.pageNum,
        userId: 206043
      };
      this.rewardModelService.getList(formData).subscribe(data => {
        let articles = data.articles || [];
        let currentTime = data.currentTime;
        if (!articles.length) {
          if (this.pageNum !== 1) {
            this.dialogService.openTipDialog({
              content: '已经是最后一页了'
            });
          }
          this.pageNum = -1;
        } else {
          articles.forEach(value => {
            let tplObj = RewardListEntity.init();
            tplObj.isDoing = (value.articleTime - currentTime) > 0;
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
          this.dialogService.openTipDialog({
            content: '已经是最后一页了'
          });
        }
      }
    }

  }

}
