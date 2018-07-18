import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {TypeService} from '../../shared/service/type.service';
import {RewardModelService} from '../service/reward-model.service';
import {DateFormatService} from '../../shared/service/date-format.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ReplyEntity, RewardDetailEntity, UserInfoEntity} from '../entity/reward-entity';
import {EscapeHtmlService} from '../../shared/service/escape-html.service';
import {DialogService} from '../../shared/service/dialog.service';
import {promise} from 'selenium-webdriver';
import {PKComponent} from '../pk/pk.component';
import {UserService} from '../../shared/service/user.service';
import {StorageService} from '../../shared/service/storage.service';

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
  //评论最大字数
  public commentValMaxLen: number = 500;

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
  public showLoading: boolean = true;
  public userInfo: UserInfoEntity;
  public userId: string;
  public subStrLen: number = 60;
  public subStrLenBody: number = 100;

  constructor(public typeService: TypeService,
              public escapeHtmlService: EscapeHtmlService,
              public render: Renderer2,
              public router: Router,
              public userService: UserService,
              public dialogService: DialogService,
              public dateFormatService: DateFormatService,
              public activatedRoute: ActivatedRoute,
              public storageService: StorageService,
              public rewardModelService: RewardModelService) {
    this.pageNum = 1;
    this.userService.getUserInfo().then((userInfo: UserInfoEntity) => {

      // this.userId = this.storageService.getStorageValue('userId');

      this.storageService.localStorage.observe('userId')
        .subscribe((newValue) => {
          this.userId = newValue;
        });
    });

    this.activatedRoute.paramMap.subscribe(next => {
      this.articleId = next.get('id');

      this.getDetail().then(() => {
        this.showLoading = false;
        // this.storageService.setStorageValue('articleTitle', this.articleDetailObj.title);
        this.render.setAttribute(document.body, 'data-articleTitle', this.articleDetailObj.title);
        //放在title后面
        this.initScript(this.articleId);
      });
    });
  }

  ngOnInit() {


  }


  /**
   *
   * @param {boolean} isGetReply
   * @returns {Promise<any>}
   */
  public getDetail(isGetReply: boolean = true): Promise<any> {
    return new Promise<any>(((resolve, reject) => {
      this.userId = this.storageService.getStorageValue('userId');
      let formData;
      if (this.userId) {
        formData = {
          articleId: this.articleId,
          userId: this.userId
        };
      } else {
        formData = {
          articleId: this.articleId,
        };
      }
      this.rewardModelService.getDetail(formData).subscribe(data => {
        let initData = RewardDetailEntity.init();
        this.articleDetailObj = {...initData, ...data};
        // this.articleDetailObj = Object.assign(initData, data);
        this.checkCountdown(data);
        this.PKComponent.articleDetailObj = this.articleDetailObj;
        const imgList = data.img;
        let body = data.body.toString();
        let index = -1;
        this.articleDetailObj.body = body.replace(/(<!--IMG#\d+-->)/gm, function (match, ...m) {
          index++;
          return `<img src="${imgList[index].src}" width="100%"/>`;
        });
        if (this.articleDetailObj.body.length > this.subStrLenBody) {
          this.articleDetailObj.showSimpleBody = true;
          this.articleDetailObj.newBody = this.typeService.substring(this.articleDetailObj.body, this.subStrLenBody);
        } else {
          this.articleDetailObj.newBody = this.articleDetailObj.body;
        }
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
    const countdownTime = parseInt(data.articleTime) + 5 * 24 * 60 * 60 * 1000;
    let gap = countdownTime - parseInt(currentTime);
    if (gap >= 0 && gap <= 5 * 24 * 60 * 60 * 1000) {
      let day = Math.floor(gap / (24 * 60 * 60 * 1000));
      let hours = Math.floor((gap - day * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));
      this.articleDetailObj.countDownStr = `${day} 天 ${hours} 小时`;
      this.articleDetailObj.showCountdown = true;
      this.articleDetailObj.showDoing = false;
      this.articleDetailObj.showEnd = false;
    } else if (gap > 5 * 24 * 60 * 60 * 1000) {
      this.articleDetailObj.showCountdown = false;
      this.articleDetailObj.showDoing = false;
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
  private async getReplyList(isSendComment: boolean = false): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.userId = this.storageService.getStorageValue('userId');

      let formData;
      if (this.userId) { //已经登录
        formData = {
          id: this.articleDetailObj.id,
          channelId: this.articleDetailObj.channelId,
          pageNum: isSendComment ? 1 : this.pageNum,
          userId: this.userId
        };
      } else { //未登录
        formData = {
          id: this.articleDetailObj.id,
          channelId: this.articleDetailObj.channelId,
          pageNum: this.pageNum,
        };
      }

      this.rewardModelService.getReplyList(formData).subscribe(data => {

        let wonderList = [...data.wonderFulReply];
        this.wonderReplyList = [];
        wonderList.forEach(value => {
          let replyObj = ReplyEntity.init();
          Object.assign(replyObj, value);
          replyObj.content = this.escapeHtmlService.unescapeHtml(replyObj.content);
          if (replyObj.content.length > this.subStrLen) {
            replyObj.showSimpleContent = true;
            replyObj.simpleContent = this.typeService.substring(replyObj.content, this.subStrLen);
          }
          if (replyObj.toReplyContent && replyObj.toReplyContent.length > this.subStrLen) {
            replyObj.showSimpleOriginContent = true;
            replyObj.simpleOriginContent = this.typeService.substring(replyObj.toReplyContent, this.subStrLen);

            console.log('replyObj.simpleOriginContent', replyObj.simpleOriginContent);
          }
          this.wonderReplyList.push(replyObj);
        });

        let allReplyList = [...data.allReply];
        if (!allReplyList.length) {
          // if (this.pageNum !== 1) {
          //   this.dialogService.openTipDialog({
          //     content: '已经是最后一页了'
          //   });
          // }
          this.pageNum = -1;

        } else {
          allReplyList.forEach(reply => {
            let replyObj = ReplyEntity.init();
            Object.assign(replyObj, reply);
            if (replyObj.content.length > this.subStrLen) {
              replyObj.showSimpleContent = true;
              replyObj.simpleContent = this.typeService.substring(replyObj.content, this.subStrLen);
            }
            if (replyObj.toReplyContent && replyObj.toReplyContent.length > this.subStrLen) {
              replyObj.showSimpleOriginContent = true;
              replyObj.simpleOriginContent = this.typeService.substring(replyObj.toReplyContent, this.subStrLen);

            }

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
        this.showLoading = false;
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
      this.showLoading = true;
      this.userService.doLogin().then(() => {
        this.userId = this.storageService.getStorageValue('userId');
        if (this.userId) {
          this.rewardModelService.praise({
            replyId: reply.id,
            userId: this.userId
          }).subscribe(data => {
            if (reply.isDigg === 'yes') {
              reply.isDigg = 'no';
            } else {
              reply.isDigg = 'yes';
            }
            reply.digg = data.digNum;
            this.showLoading = false;
          });
        } else {
          this.showLoading = false;
        }

      });

    }

  }

  /**
   * 发送评论
   * @param {Event} event
   * @param ipt
   */
  public async sendComment(event: Event, ipt: HTMLElement): Promise<any> {
    let content = this.commentValue.replace(/^[@][\w\u4e00-\u9fa5]+[\s]/, '');
    if (content && content.trim()) {
      //发送按钮的字数需要再次确认
      let countLen = this.typeService.getStringLocaleLen(content);
      if (countLen > this.commentValMaxLen) {
        content = this.typeService.localeSubString(content, 0, this.commentValMaxLen);
      }

      let replyId = /^[@][\w\u4e00-\u9fa5]+[\s]/.test(this.commentValue) ? this.currentReplyPeople : '';
      // if (this.topicId === '') {
      //   this.topicId = await this.getTopicId();
      // }

      this.userService.doLogin().then(() => {
        this.userId = this.storageService.getStorageValue('userId');
        content = this.escapeHtmlService.escapeHtml(content);
        let formData = {
          topicId: this.articleDetailObj.topicId,
          channlId: this.articleDetailObj.channelId,
          objectType: this.articleDetailObj.type,
          objectId: this.articleDetailObj.id,
          objectTitle: this.articleDetailObj.title,
          content: content,
          replyIds: replyId,
          userId: 894671
        };
        // console.log('form', formData);
        const params = `userId=${this.userId}&topicId=${this.articleDetailObj.topicId}&channlId=${this.articleDetailObj.channelId}&objectType=${this.articleDetailObj.type}&objectId=${this.articleDetailObj.id}&objectTitle=${this.articleDetailObj.title}&content=${content}&replyIds=${replyId}`;
        this.rewardModelService.doComment(params).subscribe(data => {
          this.allReplyList = [];
          this.wonderReplyList = [];
          this.pageNum = 1;
          this.commentValue = '';
          ipt['value'] = '';
          ipt.focus();
          ipt.blur();
          clearTimeout(this.scrollTimer);
          this.showLoading = true;
          this.getReplyList(true);
        });
      });


    }

  }


  @HostListener('window:scroll', ['$event'])
  doSomething(event) {
    if (!this.showLoading) {
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
            // this.dialogService.openTipDialog({
            //   content: '已经是最后一页'
            // });
          }
        }
      }, 300);

    }

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

  /**
   *检查并登录
   */
  public checkDoLogin() {
    this.userService.doLogin();
  }


  /**
   * 初始化分享script
   */
  private initScript(id: string) {

    let oldScriptList = Array.from(document.getElementsByClassName('share-script'));
    oldScriptList.forEach(value => {
      this.render.removeChild(document.body, value);
    });

    // this.storageService.setStorageValue('articleId', id);
    this.render.setAttribute(document.body, 'data-articleId', id);
    let ele = this.render.createElement('script');
    ele.setAttribute('src', './assets/js/share-detail.js');
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

  /**
   * 文章展开
   * @param {MouseEvent} event
   */
  public clickExpend(event: MouseEvent): void {
    event.stopPropagation();
    this.articleDetailObj.bodyHasExpend = true;
    this.articleDetailObj.newBody = this.articleDetailObj.body;
  }

  /**
   * 文章收起
   * @param {MouseEvent} event
   */
  public clickUnExpend(event: MouseEvent): void {
    event.stopPropagation();
    this.articleDetailObj.bodyHasExpend = false;
    this.articleDetailObj.newBody = this.typeService.substring(this.articleDetailObj.body, this.subStrLenBody);
  }


}
