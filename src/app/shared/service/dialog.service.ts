import {Injectable} from '@angular/core';
import {NotificationService} from './notification.service';

@Injectable()
export class DialogService {

  constructor(public notificationService: NotificationService) {
  }

  public openWinnerDialog(): void {
    this.notificationService.publish({
      act: 'open-winner-tip'
    });
  }

  public openTipDialog(data: any): void {
    this.notificationService.publish({
      act: 'open-tip-dialog',
      data: {content: data.content}
    });
  }
}
