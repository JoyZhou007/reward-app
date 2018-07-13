// const articleId = window.localStorage.getItem('articleId');
// const articleTitle = window.localStorage.getItem('articleTitle');
const articleId = document.body.getAttribute('data-articleId');
const articleTitle = document.body.getAttribute('data-articleTitle');

const shareData={
  title: document.body.getAttribute('data-articleTitle'), // 分享标题
  desc: '【我的钢铁】术业有专攻，英雄所见略有不同，说出你的观点，现金红包等着你～', // 分享描述
  link: "http://192.168.20.72:4200/reward-detail/" + document.body.getAttribute('data-articleId'), // 分享链接
  imgUrl: 'http://m.steelphone.com/share.png', // 分享图标
  success: function (msg) {
    //console.log(msg);
  }
}


if (window.mysteeljs || window.webkit) {

  const id = "";//分享id
  const type = "";//分享类型
  const title = shareData.title;//分享标题按
  const desc = shareData.desc;//分享描述
  const link = shareData.link;//分享链接
  const imgUrl = shareData.imgUrl;//分享图标

  if (window.mysteeljs) {
    window.mysteeljs && window.mysteeljs.hideShareMenu(false);
    window.mysteeljs.share(title, desc, link, imgUrl, id, type);
  }
  else if (window.webkit.messageHandlers && window.webkit.messageHandlers && window.webkit.messageHandlers.hideShareMenu) {
    window.webkit.messageHandlers.hideShareMenu.postMessage("false");
    const shareData = [title, desc, link, imgUrl, id, type];
    window.webkit.messageHandlers.share.postMessage(shareData);
  }
}


window.jssign = function (appId, timestamp, nonceStr, signature) {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: appId, // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: nonceStr, // 必填，生成签名的随机串
    signature: signature,// 必填，签名，见附录1
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'hideOptionMenu'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
}
wx.ready(function () {
  wx.onMenuShareAppMessage(shareData);
  wx.onMenuShareTimeline(shareData);
  wx.onMenuShareQQ(shareData);
});
