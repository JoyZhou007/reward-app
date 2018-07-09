import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {TypeService} from '../../shared/service/type.service';
import {RewardModelService} from '../service/reward-model.service';
import {DateFormatService} from '../../shared/service/date-format.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ReplyEntity, RewardDetailEntity} from '../entity/reward-entity';
import {EscapeHtmlService} from '../../shared/service/escape-html.service';
import {DialogService} from '../../shared/service/dialog.service';
import {promise} from 'selenium-webdriver';
import {PKComponent} from '../pk/pk.component';
import {UserService} from '../../shared/service/user.service';

@Component({
  selector: 'app-reword-detail',
  templateUrl: './reword-detail.component.html',
  styleUrls: ['./reword-detail.component.scss']
})
export class RewordDetailComponent implements OnInit {
  public titStr: string;
  public newStr: string;
  public showMore: boolean = false;
  public commentValue: string;

  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  public articleDetailObj: RewardDetailEntity = RewardDetailEntity.init();
  public articleId: string | null;
  public wonderReplyList: ReplyEntity[] = [];
  public allReplyList: ReplyEntity[] = [];
  private pageNum: number = 1;
  private currentReplyPeople: string = '';

  @ViewChild(PKComponent) PKComponent: PKComponent;
  public hasInit: boolean = false;
  private scrollTimer: any;
  public showLoading: boolean = false;

  constructor(public typeService: TypeService,
              public escapeHtmlService: EscapeHtmlService,
              public router: Router,
              public userService: UserService,
              public typeScript: TypeService,
              public dialogService: DialogService,
              public dateFormatService: DateFormatService,
              public activatedRoute: ActivatedRoute,
              public rewardModelService: RewardModelService) {
    this.pageNum = 1;
  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(next => {
      this.articleId = next.get('id');
      this.getDetail().then(() => {
        this.hasInit = true;
      });
    });

    this.userService.checkIsLogin();

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


  /**
   *
   * @param {boolean} isGetReply
   * @returns {Promise<any>}
   */
  public getDetail(isGetReply: boolean = true): Promise<any> {
    return new Promise<any>(((resolve, reject) => {
      this.rewardModelService.getDetail(this.articleId).subscribe(data => {
        this.articleDetailObj = RewardDetailEntity.init();
        this.checkCountdown(data);
        Object.assign(this.articleDetailObj, data);
        this.PKComponent.articleDetailObj = this.articleDetailObj;
        const imgList = data.img;
        let body = data.body.toString();
        let index = -1;
        this.articleDetailObj.body = body.replace(/(<!--IMG#\d+-->)/gm, function (match, ...m) {
          index++;
          return `<img src="${imgList[index].src}" width="100%"/>`;
        });
        if (isGetReply) {
          this.getReplyList().then(() => {
            resolve(data);
          });
        }

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
    const countdownTime = parseInt(data.articleTime);
    let gap = countdownTime - parseInt(currentTime);
    if (gap > 0 && gap < 5 * 24 * 60 * 60 * 1000) {
      let day = Math.floor(gap / (24 * 60 * 60 * 1000));
      let hours = Math.floor((gap - day * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));
      this.articleDetailObj.countDownStr = `${day} 天 ${hours} 小时`;
      this.articleDetailObj.showCountdown = true;
      this.articleDetailObj.showDoing = false;
      this.articleDetailObj.showEnd = false;
    } else if (gap > 5 * 24 * 60 * 60 * 1000) {
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
      console.log('page@@@', this.pageNum);
      this.rewardModelService.getReplyList({
        id: this.articleDetailObj.id,
        channelId: this.articleDetailObj.channelId,
        pageNum: this.pageNum
      }).subscribe(data => {
        // if (this.pageNum === 1) {
        //
        // }


        let wonderList = data.wonderFulReply || [];
        wonderList.forEach(value => {
          let replyObj = ReplyEntity.init();
          Object.assign(replyObj, value);
          this.wonderReplyList.push(replyObj);
        });

        let allReplyList = data.allReply || [];
        if (!allReplyList.length) {
          // if (this.pageNum !== 1) {
          //   this.dialogService.openTipDialog({
          //     content: '已经是最后一页了'
          //   });
          // }
          this.pageNum = -1;

        } else {
          // this.pageNum++;
          allReplyList.forEach(reply => {
            let replyObj = ReplyEntity.init();
            Object.assign(replyObj, reply);
            //将精彩评论和全部评论对象关联
            for (let i = 0, len = this.wonderReplyList.length; i < len; i++) {
              if (this.wonderReplyList[i].id === replyObj.id) {
                console.log('相同');
                this.wonderReplyList[i] = replyObj;
              }
            }
            this.allReplyList.push(replyObj);
          });
        }

        resolve(data);

      });
    });
  }

  /**
   * 点赞/取消赞
   * @param {MouseEvent} event
   * @param {ReplyEntity} reply
   */
  public clickPraise(event: MouseEvent, reply: ReplyEntity): void {
    event.stopPropagation();
    if (!this.showLoading) {
      this.userService.checkIsLogin().then((userInfo:any)=>{
        console.log('userInfo',userInfo)
        this.showLoading = true;
        this.rewardModelService.praise({
          replyId: reply.id
        }).subscribe(data => {
          if (reply.isDigg === 'yes') {
            reply.isDigg = 'no';
          } else {
            reply.isDigg = 'yes';
          }
          reply.digg = data.digNum;
          this.showLoading = false;
        });
      })


    }

  }

  /**
   * 发送评论
   * @param {Event} event
   * @param ipt
   */
  public async sendComment(event: Event, ipt: HTMLElement): Promise<any> {
    if (this.commentValue && this.commentValue.trim() !== '') {
      let replyId = /^[@][\w\u4e00-\u9fa5]+[\s]/.test(this.commentValue) ? this.currentReplyPeople : '';
      let topicId = await this.getTopicId();
      let content = this.commentValue.replace(/^[@][\w\u4e00-\u9fa5]+[\s]/, '');
      let formData = {
        topicId: topicId,
        channlId: this.articleDetailObj.channelId,
        objectType: this.articleDetailObj.type,
        objectId: this.articleDetailObj.id,
        objectTitle: this.articleDetailObj.title,
        content: content,
        replyId: replyId
      };
      this.rewardModelService.doComment(formData).subscribe(data => {
        this.allReplyList = [];
        this.wonderReplyList = [];
        this.pageNum = 1;
        this.commentValue = '';
        ipt.blur();
        this.getReplyList();
      });
    }

  }


  @HostListener('window:scroll', ['$event'])
  doSomething(event) {
    if (this.hasInit) {
      clearTimeout(this.scrollTimer);
      this.scrollTimer = setTimeout(() => {
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
          // you're at the bottom of the page
          console.log('Bottom of page');
          // you're at the bottom of the page
          if (this.pageNum !== -1) {
            this.pageNum++;
            this.getReplyList();
          } else {
            this.dialogService.openTipDialog({
              content: '已经是最后一页了'
            });
          }
        }
      }, 300);

    }

  }

  /**
   * 获取topicId
   * @returns {promise<any>}
   */
  private getTopicId(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.rewardModelService.getTopicId({
        id: this.articleDetailObj.id,
        type: this.articleDetailObj.type
      }).subscribe(data => {
        let topicId = data.topicId || '';
        resolve(topicId);
      });
    });
  }

  public clickCommentReply(event: MouseEvent, ipt: HTMLElement, reply: ReplyEntity): void {
    ipt.focus();
    this.commentValue = `@${reply.name} `;
    this.currentReplyPeople = reply.id;
  }

  /**
   * 点击评论赢赏金
   * @param {MouseEvent} event
   */
  public showRewardTip(event: MouseEvent): void {
    event.stopPropagation();
    this.dialogService.openWinnerDialog();
  }


  public OutFresh(): void {

    this.getDetail(false);
  }

}
