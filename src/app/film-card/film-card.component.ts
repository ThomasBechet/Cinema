import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Movie } from '../metier/movie';

@Component({
  selector: 'film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {

  @Input() movie: Movie;
  poster_path : boolean
  constructor() {
    
   }

  ngOnInit() {

    if (this.movie == null){
      return;
    }
    
    this.poster_path = this.movie.poster != null; 
  }

}
