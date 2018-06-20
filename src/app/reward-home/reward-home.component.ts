import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reward-home',
  templateUrl: './reward-home.component.html',
  styleUrls: ['./reward-home.component.scss']
})
export class RewardHomeComponent implements OnInit {
  public topicList: Array<any>;

  constructor(public router:Router) {
    this.topicList = ['', '', ''];
  }

  ngOnInit() {
  }


  /**
   * 点击打开详情页面
   * @param {MouseEvent} event
   */
  public clickOpenDetail(event: MouseEvent): void {
    event.stopPropagation();
    this.router.navigate(['reward-detail',11])
  }
}
