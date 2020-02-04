import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { Movie } from '../metier/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  rdmMovies: Array<Movie>;
  selectedMovie: Movie;
  showVar: boolean = false;
  movieLoaded: boolean = false;

  constructor(private session: SessionService, private router: Router, private moviesService: MoviesService) { }

  ngOnInit() {
    this.session.preconnect()
    .then((response) => {
      this.moviesService.getRandomMovie(8, ["poster"])
      .then((value) => {
        this.rdmMovies = <Array<Movie>>value;
        this.loadScript('../assets/js/slick.min.js');
        this.loadScript('../assets/js/slider.js');
      });
    })
    .catch((error) => {
      console.log('try to access home but could not preconnect');
      console.log(error);
      this.router.navigateByUrl('/');  
    });
  }
  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  showModal(movie_id) {
    this.moviesService.getMovie(movie_id)
      .then((value) => {
        this.selectedMovie = value['movie'];
        this.showVar = true;

      });
  }

}
