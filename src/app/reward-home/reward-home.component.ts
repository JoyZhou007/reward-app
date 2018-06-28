import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RewardModelService} from './service/reward-model.service';
import {DateFormatService} from '../shared/service/date-format.service';
import {RewardListEntity} from './entity/reward-entity';

@Component({
  selector: 'app-reward-home',
  templateUrl: './reward-home.component.html',
  styleUrls: ['./reward-home.component.scss']
})
export class RewardHomeComponent implements OnInit {
  public topicList: Array<any>;

  constructor(public router: Router,
              public dateFormatService: DateFormatService,
              public rewardModelService: RewardModelService) {
    this.topicList = [];
  }

  ngOnInit() {
    this.getList();
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
        pageNO: 1,
        userId: 206043
      };
      this.rewardModelService.getList(formData).subscribe(data => {
        let articles = data.articles || [];
        let currentTime = data.currentTime;
        console.log('articles', articles);
        this.topicList = [];
        articles.forEach(value => {
          let tplObj = RewardListEntity.init();
          tplObj.isDoing = (value.articleTime - currentTime) > 0;
          Object.assign(tplObj, value);
          this.topicList.push(tplObj);
        });


      }, error => {

      });
    });

  }


}
