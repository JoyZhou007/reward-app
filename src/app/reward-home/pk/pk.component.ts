import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RewardDetailEntity, VoteEntity} from '../entity/reward-entity';
import {RewardModelService} from '../service/reward-model.service';
import {DialogService} from '../../shared/service/dialog.service';

@Component({
  selector: 'app-pk',
  templateUrl: './pk.component.html',
  styleUrls: ['./pk.component.scss']
})
export class PKComponent implements OnInit {
  public voteList: VoteEntity[] = [];
  @Output() public outFresh = new EventEmitter<any>();

  @Input() set setData(data: any) {
    if (data && data.length) {
      this.initTplData(data);
    }
  }
  stacked: any[] = [{
    value:22,
    type: 'info',
    label: 22 + ' %'
  },
    {
      value:78,
      type: 'danger',
      label: 22 + ' %'
    }];

  public articleDetailObj: RewardDetailEntity;

  constructor(public rewardModelService: RewardModelService,
              public dialogService:DialogService) {
  }

  ngOnInit() {
  }

  private initTplData(data: Array<any>) {
    this.voteList = [];
    console.log('articleStandId', this.articleDetailObj);
    data.forEach(val => {
      let tplObj = VoteEntity.init();
      Object.assign(tplObj, val);
      tplObj.width = parseInt(tplObj.supportRate);
      console.log('this.articleStandId', this.articleDetailObj, 'tplObj.id', tplObj.id);
      tplObj.hasVote = tplObj.id == this.articleDetailObj.articleStandId;
      this.voteList.push(tplObj);
    });
  }

  public clickVote(event: MouseEvent, voteObj: VoteEntity): void {
    event.stopPropagation();
    let formData = {
      id: voteObj.id,
      articleId: this.articleDetailObj.id
    };
    this.rewardModelService.vote(formData).subscribe(data => {
      this.outFresh.emit();
      this.dialogService.openTipDialog({
        content: '投票成功'
      });
    });
  }
}
