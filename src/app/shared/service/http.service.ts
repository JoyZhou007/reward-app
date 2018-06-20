import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(public http: HttpClient) {
  }

  public get(api: string): Observable<any> {
    return this.http.get(api);
  }
}
