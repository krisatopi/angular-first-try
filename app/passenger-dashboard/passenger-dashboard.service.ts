import {Passenger} from './models/passenger.interface';
import {Headers, Http, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const PASSENGER_API: string = '/api/passengers'

@Injectable()
export class PassengerDashboardService {
  constructor(private http: Http) {
  }

  getPassengers(): Observable<Passenger[]> {
    return this.http.get(PASSENGER_API)
      .map((response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  updatePassenger(passenger: Passenger): Observable<Passenger> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers})

    return this.http.put(`${PASSENGER_API}/${passenger.id}`, passenger, options)
      .map((response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  removePassenger(passenger: Passenger): Observable<Passenger> {
    return this.http.delete(`${PASSENGER_API}/${passenger.id}`, passenger)
      .map((response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  getPassenger(id: number): Observable<Passenger> {
    return this.http.get(`${PASSENGER_API}/${id}`)
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json()))
  }
}
