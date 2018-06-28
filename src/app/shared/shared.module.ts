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

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        {provide: HttpService, useClass: HttpService},
        {provide: RewardModelService, useClass: RewardModelService},
        {provide: UserService, useClass: UserService},
        {provide: DateFormatService, useClass: DateFormatService},
        {provide: EscapeHtmlService, useClass: EscapeHtmlService},
        {provide: HTTP_INTERCEPTORS, useClass: HandleInterceptor, multi: true },
      ]
    };

  }
}
