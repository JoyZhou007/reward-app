import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class NotificationService {
  public topic: Subject<any>;
  public observer: Observable<any>;

  constructor() {
    this.initNotification();
  }

  /**
   * 初始化
   */
  public initNotification(): void {
    this.topic = new Subject();
    this.observer = this.topic.asObservable();
  }

  /**
   * 获取观察者
   * @returns {Observable<any>}
   */
  public getNotification(): Observable<any> {
    return this.observer;
  }

  /**
   * 发布
   * @param data
   */
  public publish(data: {
    act: string,
    data?: any
  }): void {
    if (data) {
      this.topic.next(data);
    }
  }
}
