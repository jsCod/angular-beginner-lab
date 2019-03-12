import { FilmService } from './film.service';
import { Component, OnInit } from '@angular/core';
import {Film} from './film';


@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  pageTitle = 'Films';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredFilms = this.listFilter ? this.performFilter(this.listFilter) : this.films;
  }

  filteredFilms: Film[] = [];
  films: Film[] = [];

  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    this.filmService.getFilms().subscribe(
      films => {
        this.films = films;
        this.filteredFilms = this.performFilter(this.listFilter);
      },
      error => this.errorMessage = <any>error
    );
  }

  performFilter(filterBy: string): Film[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.films.filter((film: Film) =>
      film.filmName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}