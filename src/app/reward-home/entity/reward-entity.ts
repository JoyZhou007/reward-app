export class RewardListEntity {
  id: string;
  title: string;
  date: string;
  time: string;
  comments: string;
  content: string;
  optionName: string;
  name: string;
  replyArticleURL: string;
  faceIco: string;
  isDoing: boolean;

  static init() {
    let obj = new RewardListEntity();
    obj.id = '';
    obj.title = '';
    obj.date = '';
    obj.time = '';
    obj.comments = '';
    obj.content = '';
    obj.optionName = '';
    obj.name = '';
    obj.replyArticleURL = '';
    obj.faceIco = '';
    obj.isDoing = false;
    return obj;
  }
}


export class RewardDetailEntity {
  title: string;
  body: string;
  showReward: string; // yes | no
  countDownStr: string;
  showCountdown: boolean; //倒计时显示
  showDoing: boolean;//显示进行中
  showEnd: boolean;// 显示已结束
  replyArticleURL: string;//百家之言
  id: string;
  channelId: string;

  static init() {
    let obj = new RewardDetailEntity();
    obj.title = '';
    obj.body = '';
    obj.showReward = 'no';
    obj.showCountdown = false;
    obj.countDownStr = '';
    obj.showDoing = false;
    obj.showEnd = false;
    obj.replyArticleURL = '';
    obj.id = '';
    obj.channelId = '';
    return obj;
  }
}

/**
 * 评论
 */
export class ReplyEntity {
  content: string;
  createTime: string;
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

  static init() {
    let obj = new ReplyEntity();
    obj.content = '';
    obj.createTime = '';
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
    return obj;
  }
}
