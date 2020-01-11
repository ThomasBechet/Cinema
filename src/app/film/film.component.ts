import { Component, OnInit, Input } from '@angular/core';
import { FilmPageComponent } from '../film-page/film-page.component';
import { MoviesService } from '../movies.service'

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  private _filmPage: FilmPageComponent;
  @Input() id: string;
  @Input() poster: string;
  @Input() title : string;
  @Input() runtime: string;
  @Input() genre: string;

  constructor(private filmService: MoviesService) { 
    this._filmPage = new FilmPageComponent(filmService);
  }

  ngOnInit() {
  }

  setFilmPage(_id){
    console.log("setFilmPage from FilmComponent : ", _id);
    this._filmPage.setFilm(_id)
  }



}
