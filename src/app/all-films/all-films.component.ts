import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/films.service';

@Component({
  selector: 'app-all-films',
  templateUrl: './all-films.component.html',
  styleUrls: ['./all-films.component.scss']
})
export class AllFilmsComponent implements OnInit {

  films: any[];

  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.films = this.filmService.films;
  }

}
