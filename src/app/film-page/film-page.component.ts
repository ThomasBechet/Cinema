import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from '../metier/movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.scss']
})
export class FilmPageComponent implements OnInit {

  movie : Movie;
  liked: boolean; 
  viewed : boolean;
  constructor(private router: Router, private route : ActivatedRoute, private movieService : MoviesService) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(id).then((value) => {
      this.movie = value['movie'];
      this.viewed = value['viewed'];
      this.liked = value['liked'];
      let sumRatings = 0;
      this.movie.ratings.forEach(item => sumRatings += item.value)
      this.movie.avgRating = sumRatings / this.movie.ratings.length;
      console.log(this.movie.avgRating);
    });

  }

  getMovieByID(){
  }

}
