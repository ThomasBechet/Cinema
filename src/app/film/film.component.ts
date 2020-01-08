import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { __values } from 'tslib';
import { Movie } from '../metier/movie';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  movies: Array<Movie>;



  constructor(private router: Router, private moviesService: MoviesService) {


  }


  ngOnInit() {
    this.moviesService.getMovies(25, 10)
      .then((value) => {
        this.movies = value['movies'];
      })


  }
}
