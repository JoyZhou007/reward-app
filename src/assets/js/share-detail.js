if (window.mysteeljs || window.webkit) {
  const articleId = window.localStorage.getItem('articleId');
  const articleTitle = window.localStorage.getItem('articleTitle');

  const id = "";//分享id
  const type = "19";//分享类型
  const title = articleTitle;//分享标题按
  const desc = "【我的钢铁】术业有专攻，英雄所见略有不同，说出你的观点，现金红包等着你～";//分享描述
  const link = "http://192.168.20.72:4200/reward-detail/" + articleId;//分享链接
  const imgUrl = 'http://m.steelphone.com/share.png';//分享图标

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
