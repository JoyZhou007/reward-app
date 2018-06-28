import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../shared/service/http.service';

@Injectable()
export class RewardModelService {

  constructor(public httpService: HttpService) {
  }

  /**
   *
   * @returns {Observable<any>}
   */
  public getList(data: any): Observable<any> {
    return this.httpService.get('/v4/articleStand/list.htm?userId=206043');
  }

  /**
   * 获取详情
   * @param data
   * @returns {Observable<any>}
   */
  public getDetail(data: any): Observable<any> {
    const api = `/v4/articleStand/getContent.htm?userId=206043&articleId=${data}`;
    return this.httpService.get(api);
  }

  /**
   * 获取获奖名单
   * @param data
   * @returns {Observable<any>}
   */
  public getWinnerList(data:any): Observable<any> {
    const api = `/v4/articleStand/winnerList.htm?userId=206043&articleId=${data}`;
    return this.httpService.get(api);
  }

  /**
   * 获取评论列表
   * @returns {Observable<any>}
   */
  public getReplyList(data:any): Observable<any> {
    const api = `article/getReply.htm?userId=206043&id=${data.id}&channelId=${data.channelId}&page=1&size=15`;
    return this.httpService.get(api);
  }
}
