import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PlanetsService {

  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(public http: HttpClient) {}

   get data() {
    return this.dataChange.value;
  }

  fetchPlanets() {
    return this.http
    .get('https://swapi.co/api/planets/');
  }
}
