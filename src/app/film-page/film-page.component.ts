import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../movies.service'

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.scss']
})
export class FilmPageComponent implements OnInit {

  @Input() id: string;
  @Input() poster: string;
  @Input() title : string;
  @Input() runtime: string;
  @Input() genre: string;
  @Input() director: string;
  @Input() actors: string;
  @Input() plot: string;
  @Input() released: string;

  constructor(private filmService: MoviesService) { }

  ngOnInit() {

  }

  async setFilm(_id){
    var film;
    this.id = _id;
    film = await this.filmService.getMovie(_id);
    this.poster = film.movie.poster;
    this.title = film.movie.title
    this.runtime = film.movie.runtime
    this.genre = film.movie.genres
    this.director = film.movie.directors
    this.actors = film.movie.actors
    this.plot = film.movie.plot
    this.released = film.movie.released
    console.log("sogukejobulka : ", this.title, this.plot)
  }

  //async getMovieInfo(_id){
  //  var result;
  //  result = await this.filmService.getMovie(_id);
  //  return result
  //}
}
