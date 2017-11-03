import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/map'
import {HttpClient} from "@angular/common/http";
import {Person} from "../model";

@Injectable()
export class PersonService {
  private baseUrl = "http://localhost:8081/angular-rest-server"
  //private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: HttpClient){};

  getPersons(): Observable<Person[]> {
    //let auhtHeader = new Headers({Authorization: 'Basic ' + btoa('user:password')});

    return this.http
      .get(this.baseUrl + '/hero/all'/*, {headers: auhtHeader}*/)
      .map(response => {
          let persons = response as Person[];

          return persons;
      });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
