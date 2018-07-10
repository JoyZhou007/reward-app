import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../shared/service/http.service';
import {UserService} from '../../shared/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class RewardModelService {

  constructor(public httpService: HttpService,
              public userService: UserService) {
  }

  /**
   *文章列表
   * @returns {Observable<any>}
   */
  public getList(data: any): Observable<any> {
    const api = data.hasOwnProperty('userId') ? `/v4/articleStand/list.htm?userId=${data.userId}&pageNO=${data.pageNO}&pageSize=15` :
      `/v4/articleStand/list.htm?pageNO=${data.pageNO}&pageSize=15`;
    return this.httpService.get(api);
  }

  /**
   * 获取详情
   * @param data
   * @returns {Observable<any>}
   */
  public getDetail(data: any): Observable<any> {
    const api = `/v4/articleStand/getContent.htm?userId=1&articleId=${data}`;
    return this.httpService.get(api);
  }

  /**
   * 获取获奖名单
   * @param data
   * @returns {Observable<any>}
   */
  public getWinnerList(data: any): Observable<any> {
    const api = `/v4/articleStand/winnerList.htm?userId=1&articleId=${data}`;
    return this.httpService.get(api);
  }

  /**
   * 获取评论列表
   * @returns {Observable<any>}
   */
  public getReplyList(data: any): Observable<any> {
    const api = data.hasOwnProperty('userId') ?
      `article/getReply.htm?userId=${data.userId}&id=${data.id}&channelId=${data.channelId}&page=${data.pageNum}&size=15` :
      `article/getReply.htm?id=${data.id}&channelId=${data.channelId}&page=${data.pageNum}&size=15`;
    return this.httpService.get(api);
  }

  /**
   * 点赞取消赞
   * @param data
   * @returns {Observable<any>}
   */
  public praise(data: any): Observable<any> {

    return this.httpService.get(`/article/praise.htm?userId=${data.userId}&id=${data.replyId}`);

  }


  /**
   * 评论
   * @returns {Observable<any>}
   */
  public doComment(data: any): Observable<any> {
    return this.httpService.get(`/comment/reply/create.htm?userId=${data.userId}&topicId=${data.topicId}&channlId=${data.channlId}&objectType=${data.objectType}&objectId=${data.objectId}&objectTitle=${data.objectTitle}&content=${data.content}&replyIds=${data.replyId}`);
  }

  /**
   * 获取文章topicId
   * @param data
   * @returns {Observable<any>}
   */
  public getTopicId(data: any): Observable<any> {
    return this.httpService.get(`/article/detail.htm?id=${data.id}&userId=1&type=${data.type}`);
  }

  /**
   * 投票
   * @param data
   * @returns {Observable<any>}
   */
  public vote(data): Observable<any> {
    return this.httpService.get(`/article/submitStand.htm?id=${data.id}&articleId=${data.articleId}&userId=${data.userId}`);
  }
}
