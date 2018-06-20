import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RewardHomeComponent } from './reward-home/reward-home.component';
import {appRoutes} from './app.route';
import {RouterModule} from '@angular/router';
import {SharedModule} from './shared/shared.module';
import { RewordDetailComponent } from './reward-home/reword-detail/reword-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    RewardHomeComponent,
    RewordDetailComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    SharedModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
