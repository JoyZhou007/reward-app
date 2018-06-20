import {Component, OnInit} from '@angular/core';
import {TypeService} from '../../shared/service/type.service';
import {RewardModelService} from '../service/reward-model.service';

@Component({
  selector: 'app-reword-detail',
  templateUrl: './reword-detail.component.html',
  styleUrls: ['./reword-detail.component.scss']
})
export class RewordDetailComponent implements OnInit {
  public titStr: string;
  public newStr: string;
  public showMore: boolean = false;

  constructor(public typeService: TypeService,
              public rewardModelService: RewardModelService) {
    this.titStr = '测试测试测试测试测试测试测试测试测试测试测试测试测试测试' +
      '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试\' +\n' +
      '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试';
    this.newStr = this.typeService.substring(this.titStr, 150);
  }

  ngOnInit() {
    this.rewardModelService.getTest().subscribe()
  }

  /**
   * 点击展开
   * @param {MouseEvent} event
   */
  public clickExpend(event: MouseEvent): void {
    event.stopPropagation();
    this.showMore = !this.showMore;
    if (this.showMore) {
      this.newStr = this.titStr;
    } else {
      this.newStr = this.typeService.substring(this.titStr, 150);
    }
  }

}
