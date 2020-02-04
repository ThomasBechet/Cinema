import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../metier/movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss']
})
export class MovieModalComponent implements OnInit {

  @Input() movie: Movie;
  @Input() displayModal: boolean;
  @Input() isLiked: boolean;
  @Input() isViewed: boolean;
  @Output() displayModalChange: EventEmitter<any> = new EventEmitter();
  movieViewed: Array<Movie>;


  constructor(private movieService: MoviesService) { }

  ngOnInit() {

  }

  hideModal() {
    this.displayModalChange.emit(false);
  }

  toggleView(movie_id) {
    this.movieService.swapView(movie_id)
      .then((value) => {
        this.isViewed = !this.isViewed;
        if (!this.isViewed)
          this.isLiked = false;
      })
      .catch((error) => {
        console.log(error);
      });

  }

  toggleLike(movie_id) {
    this.movieService.swapLike(movie_id)
      .then((value) => {
        this.isLiked = !this.isLiked;
        if (this.isLiked)
          this.isViewed = true;
      })
      .catch((error) => {
      });
  }

}
