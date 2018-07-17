
var shareData={
  title: '"悬赏问答”获奖名单新鲜出炉，赶快来认领你的现金红包！', // 分享标题
  desc: '【我的钢铁】每周一个行业热门话题，畅聊不停，评论即有机会赢现金红包，赶紧来参加吧！', // 分享描述
  link: 'http://192.168.200.198/reward-app/', // 分享链接
  imgUrl: 'http://m.steelphone.com/share.png', // 分享图标
  success: function (msg) {
    //console.log(msg);
  }
}

if (window.mysteeljs || window.webkit) {

  var id = "";//分享id
  var type = "";//分享类型
  var title = shareData.title;//分享标题按
  var desc = shareData.desc;//分享描述
  var link = shareData.link;//分享链接
  var imgUrl = shareData.imgUrl;//分享图标

  if (window.mysteeljs) {
    window.mysteeljs && window.mysteeljs.hideShareMenu(false);
    window.mysteeljs.share(title, desc, link, imgUrl, id, type);
  }
  else if (window.webkit.messageHandlers && window.webkit.messageHandlers && window.webkit.messageHandlers.hideShareMenu) {
    window.webkit.messageHandlers.hideShareMenu.postMessage("false");
    var shareData = [title, desc, link, imgUrl, id, type];
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
