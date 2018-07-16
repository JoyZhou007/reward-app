import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // public publicPath: string = '/myapp';
  public publicPath: string = '';

  constructor(public http: HttpClient) {
  }

  public get(api: string): Observable<any> {
    return this.http.get(this.publicPath + api);
  }

  public post(api: string, data: any): Observable<any> {
    return this.http.post(this.publicPath + api, data);
  }
}
