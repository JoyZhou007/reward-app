import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {Type} from '@angular/core/src/type';
import {Provider} from '@angular/core/src/di/provider';
import {TypeService} from './service/type.service';
import {HttpService} from './service/http.service';
import {RewardModelService} from '../reward-home/service/reward-model.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserService} from './service/user.service';
import {DateFormatService} from './service/date-format.service';
import {HandleInterceptor} from './service/handle-interceptor';
import {EscapeHtmlService} from './service/escape-html.service';
import {NotificationService} from './service/notification.service';
import {DialogService} from './service/dialog.service';
import {Ng2Webstorage} from 'ngx-webstorage';
import { InstallAppBarComponent } from './components/install-app-bar/install-app-bar.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    Ng2Webstorage.forRoot({prefix: '', separator: '', caseSensitive: true})
    // The forRoot method allows to configure the prefix, the separator and the caseSensitive option used by the library
    // Default values:
    // prefix: "ng2-webstorage"
    // separator: "|"
    // caseSensitive: false
  ],
  declarations: [HeaderComponent, InstallAppBarComponent],
  exports: [
    HeaderComponent,
    InstallAppBarComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: HandleInterceptor, multi: true},
      ]
    };

  }
}
