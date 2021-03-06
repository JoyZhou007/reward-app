export class RewardListEntity {
  id: string;
  title: string;
  date2: string;
  time: string;
  comments: string;
  content: string;
  optionName: string;
  name: string;
  replyArticleURL: string;
  faceIco: string;
  isDoing: boolean;
  showSimpleContent: boolean;
  simpleContent: string;

  static init() {
    let obj = new RewardListEntity();
    obj.id = '';
    obj.title = '';
    obj.date2 = '';
    obj.time = '';
    obj.comments = '';
    obj.content = '';
    obj.optionName = '';
    obj.name = '';
    obj.replyArticleURL = '';
    obj.faceIco = '';
    obj.isDoing = false;
    obj.showSimpleContent = false;
    obj.simpleContent = '';
    return obj;
  }
}


export class RewardDetailEntity {
  title: string;
  body: string;
  newBody: string;
  showSimpleBody: boolean;
  bodyHasExpend: boolean;
  showReward: string; // yes | no
  countDownStr: string;
  showCountdown: boolean; //倒计时显示
  showDoing: boolean;//显示进行中
  showEnd: boolean;// 显示已结束
  replyArticleURL: string;//百家之言
  id: string; //articleId
  channelId: string;
  type: string;
  articleStandArr: any[];
  articleStandId: string; //
  hasWinners: string;
  topicId: string;
  standMould: string; // 1  2

  static init() {
    let obj = new RewardDetailEntity();
    obj.title = '';
    obj.body = '';
    obj.newBody = '';
    obj.showSimpleBody = false;
    obj.bodyHasExpend = false;
    obj.showReward = 'no';
    obj.showCountdown = false;
    obj.countDownStr = '';
    obj.showDoing = false;
    obj.showEnd = false;
    obj.replyArticleURL = '';
    obj.id = '';
    obj.channelId = '';
    obj.type = '';
    obj.articleStandArr = [];
    obj.articleStandId = '';
    obj.hasWinners = 'false';
    obj.topicId = '';
    obj.standMould = '2';
    return obj;
  }
}

/**
 * 评论
 */
export class ReplyEntity {
  content: string;
  createTimeStr: string;
  digg: string;
  faceIco: string;
  id: string;
  isDigg: string;
  name: string;
  number: string;
  optionColor: string;
  optionName: string;
  toReplyContent: string;
  toReplyId: string;
  toReplyName: string;
  toReplyNumber: string;
  topicId: string;
  userType: string;
  comments: string;
  simpleContent: string;
  showSimpleContent: boolean;
  simpleOriginContent: string;
  showSimpleOriginContent: boolean;


  static init() {
    let obj = new ReplyEntity();
    obj.content = '';
    obj.createTimeStr = '';
    obj.digg = '';
    obj.faceIco = '';
    obj.id = '';
    obj.isDigg = '';
    obj.name = '';
    obj.number = '';
    obj.optionColor = '';
    obj.optionName = '';
    obj.toReplyContent = '';
    obj.toReplyId = '';
    obj.toReplyName = '';
    obj.toReplyNumber = '';
    obj.topicId = '';
    obj.userType = '';
    obj.comments = '';
    obj.showSimpleOriginContent = false;
    obj.showSimpleContent = false;
    return obj;
  }
}

/**
 * 获奖人
 */
export class WinnerEntity {
  userName: string;
  number: string;
  tplUserName: string;
  tplNumber: string;

  static init() {
    let obj = new WinnerEntity();
    obj.userName = '';
    obj.number = '';
    obj.tplNumber = '';
    obj.tplUserName = '';
    return obj;
  }
}

/**
 * 投票
 */
export class VoteEntity {
  id: string;
  hasVote: boolean;
  option: string;
  supportRate: string;
  supportVal: number;
  width: number;
  color: string;

  static init() {
    let obj = new VoteEntity();
    obj.id = '';
    obj.hasVote = false;
    obj.option = '';
    obj.supportRate = '0%';
    obj.supportVal = 0;
    obj.width = 0;
    obj.color = '';
    return obj;
  }
}

/**
 * 用户信息
 */
export interface UserInfoEntity {
  encCellphone: string,
  encUserId: string,
  userId: string
}


/**
 * 下载地址
 * @type {string}
 */
export const DOWNLOAD_URL: string = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.mysteel.android.steelphone';
