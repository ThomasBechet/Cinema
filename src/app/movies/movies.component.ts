import { Component, OnInit, Output } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';
import { __values } from 'tslib';
import { Movie } from '../metier/movie';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Array<Movie>;
  p: number = 1;
  displaymodal: boolean;
  showVar: boolean = false;
  selectedMovie: Movie;
  movieViewed: Array<Movie>;
  isLiked: boolean;
  isViewed: boolean;
  range : number;

  @Output() movie: Movie;

  constructor(private session : SessionService, private router : Router, private moviesService: MoviesService) { 
    this.loadMovie(150);
  }

  ngOnInit() {
    this.session.preconnect()
    .then((response) => {
      
    })
    .catch((error) => {
      console.log('try to access home but could not preconnect');
      console.log(error);
      this.router.navigateByUrl('/');  
    });

    this.range = 5;
  }

  loadMovie(nb=15){
    this.moviesService.getMovies(10, nb).subscribe(value => this.movies = this.moviesService.avgRating(value['movies']));
  }

  showModal(movie) {

    this.isLiked = false;
    this.isViewed = false;

    this.moviesService.getIsLikedMovie(movie._id)
      .then((value) => {
        this.isLiked = value['liked'];
        this.isViewed = value['viewed'];
        this.showVar = true;
        this.selectedMovie = movie;
      })
      .catch((error) => {
      })
  }

  searchMovie(query) {
    if (query.length < 4){
      this.loadMovie(150);
      return;
    }
    this.moviesService.getMovieByTitle(query).subscribe((value) => {
      this.movies = this.moviesService.avgRating(value['movies']);
    })
  }


  slide(event){
    let slideValue = event.target.value;
    //Traitement lors du slide
  }
}