import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.scss']
})
export class FilmPageComponent implements OnInit {

  @Input() poster: string;
  @Input() title : string;
  @Input() runtime: string;
  @Input() genre: string;
  @Input() director: string;
  @Input() actors: string;
  @Input() plot: string;
  @Input() released: string;

  constructor() { }

  ngOnInit() {
  }

}
