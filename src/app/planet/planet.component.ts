import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Planet, Film, People} from '../models/planets.models';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {
  id: number;
  planet: Planet;
  planetResidentsNames: string[] = [];
  planetFilmsTitles: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getPlanetDetails();
    });
  }

  getPlanetDetails() {
    const planetRequestUrl = 'https://swapi.co/api/planets/' + this.id + '/';
    this.http.get<Planet>(planetRequestUrl)
      .subscribe((response) => {
          this.planet = response;
        },
        error => console.log(error), // TODO: console.log should be replace by error handling operations
        () => {
          // Request all residents
          this.planet.residents.forEach((urlString) => {
            this.http.get<People>(urlString)
              .subscribe((resident) => {
                  this.planetResidentsNames.push(resident.name);
                },
                error => console.log(error)
              );
          });
          // Request all films
          this.planet.films.forEach((urlString) => {
            this.http.get<Film>(urlString)
              .subscribe((film) => {
                  this.planetFilmsTitles.push(film.title);
                },
                error => console.log(error)
              );
          });
        }
      );
  }
}
