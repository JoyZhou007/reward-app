import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(public http: HttpClient) {
  }

  public get(api: string): Observable<any> {
    return this.http.get(api);
  }

  public post(api: string, data: any, options?: any): Observable<any> {
    if (!options) {
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'my-auth-token'
        })
      };
    }
    return this.http.post(api, data, options);
  }
}
