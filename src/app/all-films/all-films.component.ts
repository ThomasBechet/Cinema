import { Component, OnInit } from '@angular/core';
//import { FilmService } from '../services/films.service';
import { MoviesService } from '../movies.service'

@Component({
  selector: 'app-all-films',
  templateUrl: './all-films.component.html',
  styleUrls: ['./all-films.component.scss']
})
export class AllFilmsComponent implements OnInit {

  films: any[];

  constructor(private filmService: MoviesService) { }

  async ngOnInit() {
    //this.films = this.filmService.films;
    var result;
    result = await this.filmService.getMovies(10);
    this.films = result["movies"];
    //console.log("coucou méthode : ", this.filmService.getMovies(5));
   
  }

}
