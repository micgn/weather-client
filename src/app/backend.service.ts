import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';


@Injectable()
export class BackendService {

  constructor(private http: HttpClient) {
  }


  chartData() {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': environment.backendAuth
      })
    };

    return this.http.get('data', options);
  }

}
