import {Routes} from '@angular/router';
import {RewardHomeComponent} from './reward-home/reward-home.component';
import {RewordDetailComponent} from './reward-home/reword-detail/reword-detail.component';
import {WinningComponent} from './reward-home/winning/winning.component';


export const appRoutes: Routes = [
  {
    path: '',
    component: RewardHomeComponent
  },
  {
    path: 'reward-detail',
    component: RewordDetailComponent
  },
  {
    path: 'reward-home',
    component: RewardHomeComponent
  },
  {
    path: 'winning',
    component: WinningComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
