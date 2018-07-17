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
    const api = data.hasOwnProperty('userId') ? `/v4/articleStand/list.ms?userId=${data.userId}&pageNO=${data.pageNO}&pageSize=15` :
      `/v4/articleStand/list.ms?pageNO=${data.pageNO}&pageSize=15`;
    return this.httpService.get(api);
  }

  /**
   * 获取详情
   * @param data
   * @returns {Observable<any>}
   */
  public getDetail(data: any): Observable<any> {
    const api = data.hasOwnProperty('userId') ? `/v4/articleStand/getContent.ms?userId=${data.userId}&articleId=${data.articleId}` :
      `/v4/articleStand/getContent.ms?articleId=${data.articleId}`;
    return this.httpService.get(api);
  }

  /**
   * 获取获奖名单
   * @param data
   * @returns {Observable<any>}
   */
  public getWinnerList(data: any): Observable<any> {
    const api = `/v4/articleStand/winnerList.ms?articleId=${data}`;
    return this.httpService.get(api);
  }

  /**
   * 获取评论列表
   * @returns {Observable<any>}
   */
  public getReplyList(data: any): Observable<any> {
    const api = data.hasOwnProperty('userId') ?
      `/article/reply/getReply.ms?userId=${data.userId}&id=${data.id}&channelId=${data.channelId}&page=${data.pageNum}&size=15` :
      `/article/reply/getReply.ms?id=${data.id}&channelId=${data.channelId}&page=${data.pageNum}&size=15`;
    return this.httpService.get(api);
  }

  /**
   * 点赞取消赞
   * @param data
   * @returns {Observable<any>}
   */
  public praise(data: any): Observable<any> {

    return this.httpService.get(`/article/reply/praise.ms?userId=${data.userId}&id=${data.replyId}`);

  }


  /**
   * 评论
   * @returns {Observable<any>}
   */
  public doComment(data: any): Observable<any> {
    return this.httpService.get(`/article/reply/create.ms?userId=${data.userId}&topicId=${data.topicId}&channlId=${data.channlId}&objectType=${data.objectType}&objectId=${data.objectId}&objectTitle=${data.objectTitle}&content=${data.content}&replyIds=${data.replyId}`);
  }

  /**
   * 获取文章topicId
   * @param data
   * @returns {Observable<any>}
   */
  public getTopicId(data: any): Observable<any> {
    return this.httpService.get(`/article/detail.ms?id=${data.id}&userId=1&type=${data.type}`);
  }

  /**
   * 投票
   * @param data
   * @returns {Observable<any>}
   */
  public vote(data): Observable<any> {
    return this.httpService.get(`/article/submitStand.ms?id=${data.id}&articleId=${data.articleId}&userId=${data.userId}`);
  }
}
