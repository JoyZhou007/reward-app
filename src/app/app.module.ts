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
import { WinningComponent } from './reward-home/winning/winning.component';
import { DialogComponent } from './dialog/dialog.component';
import {FormsModule} from '@angular/forms';
import { PKComponent } from './reward-home/pk/pk.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { ProgressbarModule } from 'ngx-bootstrap';
import { TextareaAutoHeightDirective } from './shared/directives/textarea-auto-height.directive';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    RewardHomeComponent,
    RewordDetailComponent,
    WinningComponent,
    DialogComponent,
    PKComponent,
    TextareaAutoHeightDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,{
        useHash: true
      }
    ),
    SharedModule.forRoot(),
    // ServiceWorkerModule.register('/activity/xswd/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    HttpClientModule,
    NgZorroAntdModule,
    ProgressbarModule.forRoot()
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
