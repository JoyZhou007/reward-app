import {Injectable} from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public localStorage: LocalStorageService,
              public sessionStorage: SessionStorageService) {
  }

  public setStorageValue(key: string, value: any) {
    this.localStorage.store(key, value);
  }

  public getStorageValue(key: string) {
    return this.localStorage.retrieve(key);
  }

  public clearStorageItem(key: string) {
    this.localStorage.clear(key);
  }

  public setSessionValue(key: string, value: any) {
    this.sessionStorage.store(key, value);
  }

  public getSessionValue(key: string) {
    return this.sessionStorage.retrieve(key);
  }

  public clearSessionItem(key: string) {
    this.sessionStorage.clear(key);
  }

}
