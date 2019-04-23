import { Component, OnInit } from '@angular/core';
import { Planet, PlanetListResponse} from '../models/planets.models';
import { PageEvent } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.css']
})

export class PlanetsListComponent implements OnInit {
  planets: Planet[];            // Whole arr of planets
  filtered: Planet[] = [];      // Filtered arr of planets
  showPlanets: Planet[] = [];   // Arr of planets rendered on page

  // paginator variables
  length = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];

  constructor(private http: HttpClient) {}

  applyFilter(event: Event) {
    const filterString = (event.target as HTMLInputElement).value;
    this.filtered
      = this.planets.filter
    ((data: Planet) =>
      data['name'].trim().toLowerCase().indexOf(filterString.trim().toLowerCase()) !== -1
    );
    this.loadData();
    this.length = this.filtered.length;
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadData();
  }

  loadData() {
    const start = this.pageIndex * this.pageSize;
    const end = (this.pageIndex + 1) * this.pageSize;
    this.showPlanets = this.filtered.slice(start, end);
  }

  getPlanets(url: string = 'https://swapi.co/api/planets/') {
    this.http.get<PlanetListResponse>(url).subscribe(data => {
      if (this.planets === undefined) {
        this.planets = data['results'];
      } else {
        this.planets = this.planets.concat(data['results']);
      }
      if (data['next']) {
        this.getPlanets(data['next']);
      } else {
        this.filtered = this.planets;
        this.loadData();
        this.length = this.planets.length;
      }
    });
  }

  ngOnInit() {
    this.getPlanets();
  }
}
