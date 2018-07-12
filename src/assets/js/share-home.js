if (window.mysteeljs || window.webkit) {
  const id = "";//分享id
  const type = "19";//分享类型
  const title = "悬赏问答”获奖名单新鲜出炉，赶快来认领你的现金红包！";//分享标题按
  const desc = "【我的钢铁】每周一个行业热门话题，畅聊不停，评论即有机会赢现金红包，赶紧来参加吧！";//分享描述
  const link = "http://192.168.20.72:4200";//分享链接
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
