// var articleId = window.localStorage.getItem('articleId');
// var articleTitle = window.localStorage.getItem('articleTitle');
var articleId = document.body.getAttribute('data-articleId');
var articleTitle = document.body.getAttribute('data-articleTitle');
var shareData = {
  title: articleTitle, // 分享标题
  desc: '【我的钢铁】术业有专攻，英雄所见略有不同，说出你的观点，现金红包等着你～', // 分享描述
  link: "http://192.168.200.198/reward-app/reward-detail/" + articleId, // 分享链接
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


wx.ready(function () {
  wx.onMenuShareAppMessage(shareData);
  wx.onMenuShareTimeline(shareData);
  wx.onMenuShareQQ(shareData);
});
