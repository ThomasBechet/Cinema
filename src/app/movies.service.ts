import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { CommunicationService } from './communication.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  readonly KW_url = "http://34.77.176.92/movies";
  
  readonly KW_url_viewed_movies = this.KW_url + "/viewed";
  readonly KW_url_movies_pages = this.KW_url;
  readonly KW_url_specific_movie = this.KW_url;
  readonly KW_url_generate_movie_list = this.KW_url + "/customsearch";

  readonly KW_url_swap_like = this.KW_url + "/liked";
  readonly KW_url_swap_view = this.KW_url + "/changeView";

  constructor(private communication : CommunicationService, private sessionService : SessionService) { }

  public getViewedMovies() {
    const header = this.sessionService.buildAuthentificationHeader();
    return new Promise((resolve, reject) => {
      this.communication.get(this.KW_url_viewed_movies, header)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  public getMovies(page, nbPerPage = 5) {
    const header = this.sessionService.buildAuthentificationHeader();
    return new Promise((resolve, reject) => {
      let url = this.KW_url_movies_pages + "?";
      url += "nbPerPage=" + nbPerPage;
      url += "&";
      url += "page=" + page;
      this.communication.get(url, header)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  public getMovie(id) {
    const header = this.sessionService.buildAuthentificationHeader();
    return new Promise((resolve, reject) => {
      this.communication.get(this.KW_url_specific_movie + "/" + id, header)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  public generateMovieList() {
    const header = this.sessionService.buildAuthentificationHeader();
    return new Promise((resolve, reject) => {
      this.communication.get(this.KW_url_generate_movie_list, header)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }



  public swapLike(id) {
    const header = this.sessionService.buildAuthentificationHeader();
    const body = {
      'movieId': id
    }

    return new Promise((resolve, reject) => {
      this.communication.post(this.KW_url_swap_like, header, body)
      .then((response) => {
        this.sessionService.setToken(response['token']);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  public swapView(id) {
    const header = this.sessionService.buildAuthentificationHeader();
    const body = {
      'movieId': id
    }

    return new Promise((resolve, reject) => {
      this.communication.post(this.KW_url_swap_view, header, body)
      .then((response) => {
        this.sessionService.setToken(response['token']);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
}
