import {Component, OnInit} from '@angular/core';
import {TypeService} from '../../shared/service/type.service';
import {ActivatedRoute} from '@angular/router';
import {RewardModelService} from '../service/reward-model.service';
import {WinnerEntity} from '../entity/reward-entity';

@Component({
  selector: 'app-winning',
  templateUrl: './winning.component.html',
  styleUrls: ['./winning.component.scss']
})
export class WinningComponent implements OnInit {
  public steelList: any[];
  private articleId: string | null;
  public appList: WinnerEntity[] = [];
  public wxList: WinnerEntity[] = [];

  constructor(public typeService: TypeService,
              public rewardModelService: RewardModelService,
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
      this.rewardModelService.getWinnerList(this.articleId).subscribe(data => {
        this.appList = [];
        const appDataList = data.appList || [];
        appDataList.forEach(item => {
          let appData = WinnerEntity.init();
          Object.assign(appData, item);
          appData.tplNumber = this.typeService.formatPhone(appData.number);
          appData.tplUserName = this.typeService.formatPhone(appData.userName);
          this.appList.push(appData);
        });

        this.wxList = [];
        const wxDataList = data.wxList || [];
        wxDataList.forEach(item => {
          let wxData = WinnerEntity.init();
          Object.assign(wxData, item);
          wxData.tplNumber = this.typeService.formatPhone(wxData.number);
          wxData.tplUserName = this.typeService.formatPhone(wxData.userName);
          this.wxList.push(wxData);
        });

      });
    });
  }
}
