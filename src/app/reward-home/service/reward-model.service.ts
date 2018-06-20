import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../shared/service/http.service';

@Injectable()
export class RewardModelService {

  constructor(public httpService: HttpService) {
  }

  public getTest(): Observable<any> {
    return this.httpService.get('/api/test');
  }
}
