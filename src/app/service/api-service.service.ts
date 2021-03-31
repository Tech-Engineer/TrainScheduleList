import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  fetchStations() {
      return this.http.get('http://localhost:8080').toPromise();
  }

  getTrainsDepartureList(stationCode: string) {
    return this.http.get('http://localhost:8080/departuresList', {params: {code: stationCode}}).toPromise();
  }

  testNode() {
    return this.http.get('http://localhost:8080').toPromise();
  }
}
