import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';
import { __values } from 'tslib';
import { Movie } from '../metier/movie';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  movies: Array<Movie>;
  items: Array<any>;
  pageOfItems: Array<any>;



  constructor(private router: Router, private moviesService: MoviesService) {


  }


  ngOnInit() {
    this.moviesService.getMovies(10,50)
      .then((value) => {
        this.movies = value['movies'];
        this.items = value['movies'];
        console.log(value);
        for (let i = 0; i < value['movies'].length; i++) {
          let sumRatings = 0;
          //this.movies[i].ratings.forEach(item => sumRatings += item.value)
          //this.movies[i].avgRating = sumRatings / this.movies[i].ratings.length;
        }});
    }


  onChangePage(pageOfItems) {
        // update current page of items
        this.pageOfItems = pageOfItems;
      }
}
