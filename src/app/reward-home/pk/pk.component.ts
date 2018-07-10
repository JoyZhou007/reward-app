import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RewardDetailEntity, UserInfoEntity, VoteEntity} from '../entity/reward-entity';
import {RewardModelService} from '../service/reward-model.service';
import {DialogService} from '../../shared/service/dialog.service';
import {UserService} from '../../shared/service/user.service';

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

  @Input() userId: string;

  public articleDetailObj: RewardDetailEntity;

  constructor(public rewardModelService: RewardModelService,
              public dialogService: DialogService,
              public userService: UserService) {
  }

  ngOnInit() {
  }

  private initTplData(data: Array<any>) {
    this.voteList = [];
    data.forEach(val => {
      const tplObj = VoteEntity.init();
      Object.assign(tplObj, val);
      tplObj.width = parseInt(tplObj.supportRate);
      tplObj.hasVote = tplObj.id.toString() === this.articleDetailObj.articleStandId;
      this.voteList.push(tplObj);
    });
  }

  public clickVote(event: MouseEvent, voteObj: VoteEntity): void {
    event.stopPropagation();

    this.userService.doLogin().then((userInfo: UserInfoEntity) => {
      if (this.userId) {
        const formData = {
          id: voteObj.id,
          articleId: this.articleDetailObj.id,
          userId: this.userId
        };
        this.rewardModelService.vote(formData).subscribe(data => {
          this.outFresh.emit();
          this.dialogService.openTipDialog({
            content: '投票成功'
          });
        });
      }

    });

  }

  public clickTip(event: MouseEvent): void {
    event.stopPropagation();
    this.dialogService.openTipDialog({
      content: '投票已结束'
    });
  }
}
