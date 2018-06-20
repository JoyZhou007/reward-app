import {Routes} from '@angular/router';
import {RewardHomeComponent} from './reward-home/reward-home.component';
import {RewordDetailComponent} from './reward-home/reword-detail/reword-detail.component';


export const appRoutes: Routes = [
  {
    path: '',
    component: RewordDetailComponent
  },
  {
    path: 'reward-detail/:id',
    component: RewordDetailComponent
  },
  {
    path: 'reward-home',
    component: RewardHomeComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
