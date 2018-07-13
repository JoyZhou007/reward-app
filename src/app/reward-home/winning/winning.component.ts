import {Component, OnInit, Renderer2} from '@angular/core';
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
              public render: Renderer2,
              public rewardModelService: RewardModelService,
              public activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(next => {
      this.articleId = next.get('id');
      this.initScript(this.articleId);
      this.getWinner();
    });
  }

  ngOnInit() {


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
          appData.tplUserName = this.typeService.formatName(appData.userName);
          this.appList.push(appData);
        });

        this.wxList = [];
        const wxDataList = data.wxList || [];
        wxDataList.forEach(item => {
          let wxData = WinnerEntity.init();
          Object.assign(wxData, item);
          wxData.tplNumber = this.typeService.formatPhone(wxData.number);
          wxData.tplUserName = this.typeService.formatName(wxData.userName);
          this.wxList.push(wxData);
        });

      });
    });
  }

  /**
   * 初始化分享script
   */
  private initScript(id: string) {


    let oldScriptList = Array.from(document.getElementsByClassName('share-script'));
    oldScriptList.forEach(value => {
      this.render.removeChild(document.body, value);
    });

    // this.storageService.setStorageValue('articleId', id);
    this.render.setAttribute(document.body, 'data-articleId', id);
    let ele = this.render.createElement('script');
    ele.setAttribute('src', './assets/js/share-winner.js');
    ele.setAttribute('class', 'share-script');
    this.render.appendChild(document.body, ele);

    let oldWx = document.getElementById('wxFunc');
    if (oldWx) {
      this.render.removeChild(document.body, oldWx);
    }

    let eleWx = this.render.createElement('script');
    eleWx.setAttribute('id', 'wxFunc');
    eleWx.setAttribute('src', '//m.steelphone.com/app/invite/jssign.ms?functionName=jssign&url=' + encodeURIComponent(location.href.split('#')[0]));
    this.render.appendChild(document.body, eleWx);
  }
}
