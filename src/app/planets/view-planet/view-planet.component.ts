import { element } from 'protractor';
import { PlanetsService } from './../../services/planets.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-view-planet',
  templateUrl: './view-planet.component.html',
  styleUrls: ['./view-planet.component.css']
})

export class ViewPlanetComponent implements OnInit {
  planetName: string;
  planets = [];
  planetDetail = {};
  constructor(
    private route: ActivatedRoute,
    public planetsService: PlanetsService,
    public router: Router
  ) {}

  ngOnInit() {
    // this.planetsService.fetchPlanets();
    this.planetName = this.route.snapshot.paramMap.get('name');
    this.planetsService.fetchPlanets().subscribe(
      (data: any) => {
        this.planets = data.results;
        this.getPlanetDetail();
      }
    );
  }

  getPlanetDetail() {
    for (let element of this.planets) {
      if (this.planetName === element.name ) {
        this.planetDetail = element;
      }
    }
  }

  goBack() {
    this.router.navigate(['planets']);
  }

}
