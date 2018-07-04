import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../shared/service/notification.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public showDialog: boolean = false;
  public tipContent: string = '';
  public showTipDialog: boolean = false;
  public tipTimer: any;

  constructor(public notificationService: NotificationService) {
    this.notificationService.getNotification().subscribe(next => {
      if (next.act === 'open-winner-tip') {
        this.showDialog = true;
      } else if (next.act === 'open-tip-dialog') {
        this.tipContent = next.data.content;
        this.showTipDialog = true;
        clearTimeout(this.tipTimer);
        this.tipTimer = null;
        this.tipTimer = setTimeout(() => {
          this.showTipDialog = false;
          clearTimeout(this.tipTimer);
        }, 1500);
      }
    });
  }

  ngOnInit() {
  }

}
