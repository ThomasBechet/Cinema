import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private sessionService : SessionService) { }

  
}
