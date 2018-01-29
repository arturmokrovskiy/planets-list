import { PlanetsService } from './../services/planets.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {
  displayedColumns = ['name', 'orbital_period', 'rotation_period', 'population', 'select'];
  exampleDatabase: PlanetsService | null;
  selection = new SelectionModel<string>(true, []);
  dataSource: PlanetsDataSource | null;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public planetsService: PlanetsService, private router: Router) {
  }

  ngOnInit() {
    this.dataSource = new PlanetsDataSource(this.planetsService, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
  }
  onViewPlanet(planet: any) {
    this.router.navigate(['planets/', planet.name]);
  }
}

export class PlanetsDataSource extends DataSource<any> {
  planets = [];

  filterChange = new BehaviorSubject('');
  get filter(): string { return this.filterChange.value; }
  set filter(filter: string) { this.filterChange.next(filter); }

  filteredData: any[] = [];
  renderedData: any[] = [];

  constructor(private planetsService: PlanetsService,
              private _paginator: MatPaginator,
              private sort: MatSort) {
    super();
    this.filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  connect(): Observable<any[]> {
    const displayDataChanges = [
      this.planetsService.dataChange,
      this.sort.sortChange,
      this.filterChange,
      this._paginator.page,
    ];

    this.planetsService.fetchPlanets().subscribe(
      (data: any) => {
        this.planets = data.results;
        this.planetsService.dataChange.next(data.results);
      });

    return Observable.merge(...displayDataChanges).map(() => {
      this.filteredData = this.planetsService.data.slice().filter((item: any) => {
        const searchStr = (item.name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      const sortedData = this.sortData(this.filteredData.slice());

      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }

  disconnect() {}

  sortData(data: any[]): any[] {
    if (!this.sort.active || this.sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this.sort.active) {
        case 'orbital_period': [propertyA, propertyB] = [a.orbital_period, b.orbital_period]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'orbital_period': [propertyA, propertyB] = [a.orbital_period, b.orbital_period]; break;
        case 'population': [propertyA, propertyB] = [a.population, b.population]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
    });
  }
}
