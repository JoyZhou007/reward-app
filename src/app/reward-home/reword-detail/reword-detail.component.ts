import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {TypeService} from '../../shared/service/type.service';
import {RewardModelService} from '../service/reward-model.service';
import {DateFormatService} from '../../shared/service/date-format.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ReplyEntity, RewardDetailEntity} from '../entity/reward-entity';
import {EscapeHtmlService} from '../../shared/service/escape-html.service';

@Component({
  selector: 'app-reword-detail',
  templateUrl: './reword-detail.component.html',
  styleUrls: ['./reword-detail.component.scss']
})
export class RewordDetailComponent implements OnInit {
  public titStr: string;
  public newStr: string;
  public showMore: boolean = false;

  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  public articleDetailObj: RewardDetailEntity = RewardDetailEntity.init();
  public articleId: string | null;
  public wonderReplyList: ReplyEntity[] = [];

  constructor(public typeService: TypeService,
              public escapeHtmlService: EscapeHtmlService,
              public router: Router,
              public dateFormatService: DateFormatService,
              public activatedRoute: ActivatedRoute,
              public rewardModelService: RewardModelService) {
    this.titStr = '测试测试测试测试测试测试测试测试测试测试测试测试测试测试' +
      '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试\' +\n' +
      '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试';
    this.newStr = this.typeService.substring(this.titStr, 150);
  }

  ngOnInit() {
    let date = this.dateFormatService.formatLocal(new Date());
    console.log('date', date);

    this.activatedRoute.paramMap.subscribe(next => {
      this.articleId = next.get('id');
      this.getDetail();

    });

  }

  /**
   * 点击展开
   * @param {MouseEvent} event
   */
  public clickExpend(event: MouseEvent): void {
    event.stopPropagation();
    this.showMore = !this.showMore;
    if (this.showMore) {
      this.newStr = this.titStr;
    } else {
      this.newStr = this.typeService.substring(this.titStr, 150);
    }
  }


  @HostListener('scroll', ['$event'])
  doSomething(event) {
    console.log('event', event, this.scrollContainer);
    let wrapper = this.scrollContainer.nativeElement;
    console.log('wrapper.scrollTop', wrapper.scrollTop, 'window.innerHeight', window.innerHeight, 'wrapper.scrollHeight', wrapper.scrollHeight);
    if (wrapper.scrollTop + window.innerHeight >= wrapper.scrollHeight) {
      console.log('reached bottom!');
    }
  }

  private getDetail(): Promise<any> {
    return new Promise<any>(((resolve, reject) => {
      this.rewardModelService.getDetail(this.articleId).subscribe(data => {
        this.articleDetailObj = RewardDetailEntity.init();
        this.checkCountdown(data);
        Object.assign(this.articleDetailObj, data);
        this.getReplyList();
      });
    }));
  }

  public clickGoToWin(event: MouseEvent): void {
    event.stopPropagation();
    this.router.navigate(['/winning', this.articleId]);
  }

  /**
   * 检查是否显示倒计时
   * @param data
   */
  private checkCountdown(data: any) {
    const currentTime = data.currentTime;
    const countdownTime = new Date(data.publishTime).getTime();
    let gap = parseInt(currentTime) - countdownTime;
    if (gap > 0 && gap < 5 * 24 * 60 * 60 * 100) {
      let day = Math.floor(gap / (24 * 60 * 60 * 1000));
      let hours = Math.floor((gap - day * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));
      this.articleDetailObj.countDownStr = `${day} 天 ${hours} 小时`;
      this.articleDetailObj.showCountdown = true;
      this.articleDetailObj.showDoing = false;
      this.articleDetailObj.showEnd = false;
    } else if (gap > 5 * 24 * 60 * 60 * 100) {
      this.articleDetailObj.showCountdown = false;
      this.articleDetailObj.showDoing = true;
      this.articleDetailObj.showEnd = false;

    } else if (gap < 0) {
      this.articleDetailObj.showCountdown = false;
      this.articleDetailObj.showDoing = false;
      this.articleDetailObj.showEnd = true;
    }

  }

  /**
   * 获取评论列表
   * @returns {Promise<any>}
   */
  private getReplyList(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.rewardModelService.getReplyList({
        id: this.articleDetailObj.id,
        channelId: this.articleDetailObj.channelId
      }).subscribe(data => {
        let wonderList = data.wonderFulReply;
        wonderList.forEach(value => {
          let replyObj = ReplyEntity.init();
          Object.assign(replyObj, value);
          this.wonderReplyList.push(replyObj);
        });
      });
    });
  }
}
