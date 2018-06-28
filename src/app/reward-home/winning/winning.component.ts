import {Component, OnInit} from '@angular/core';
import {TypeService} from '../../shared/service/type.service';
import {ActivatedRoute} from '@angular/router';
import {RewardModelService} from '../service/reward-model.service';

@Component({
  selector: 'app-winning',
  templateUrl: './winning.component.html',
  styleUrls: ['./winning.component.scss']
})
export class WinningComponent implements OnInit {
  public steelList: any[];
  private articleId: string | null;

  constructor(public typeService: TypeService,
              public rewardModelService:RewardModelService,
              public activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(next => {
      this.articleId = next.get('id');
      this.getWinner();
    });
  }

  ngOnInit() {
    this.steelList = [
      {
        name: '周杰伦',
        phone: '15026961810',
        tplPhone: '',
        tplName: ''
      },
      {
        name: '周杰伦',
        phone: '15026961810',
        tplPhone: '',
        tplName: ''
      }, {
        name: '周杰伦',
        phone: '15026961810',
        tplPhone: '',
        tplName: ''
      }, {
        name: '周杰伦',
        phone: '15026961810',
        tplPhone: '',
        tplName: ''
      }, {
        name: '周杰伦',
        phone: '15026961810',
        tplPhone: '',
        tplName: ''
      }, {
        name: '周杰伦',
        phone: '15026961810',
        tplPhone: '',
        tplName: ''
      }, {
        name: '周杰伦',
        phone: '15026961810',
        tplPhone: '',
        tplName: ''
      },
      {
        name: '胡歌',
        phone: '15026961810',
        tplPhone: '',
        tplName: ''
      },
      {
        name: '吴彦祖',
        phone: '15026961810',
        tplPhone: '',
        tplName: ''
      },
      {
        name: '吴彦祖',
        phone: '15026961810',
        tplPhone: '',
        tplName: ''
      },
      {
        name: '吴彦祖',
        phone: '15026961810',
        tplPhone: '',
        tplName: ''
      },
      {
        name: '吴彦祖',
        phone: '15026961810',
        tplPhone: '',
        tplName: ''
      },
    ];

    this.steelList.forEach(value => {
      value.tplPhone = this.typeService.formatPhone(value.phone);
      value.tplName = this.typeService.formatName(value.name);
    });

  }

  private getWinner(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.rewardModelService.getWinnerList(this.articleId).subscribe()
    });
  }
}
