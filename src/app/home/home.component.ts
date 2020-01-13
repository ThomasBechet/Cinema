import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private movies : MoviesService, private session: SessionService, private router : Router) { }

  private username;
  private email;

  ngOnInit() {
    this.session.preconnect()
    .then((response) => {
      this.username = this.session.getUsername();
      this.email = this.session.getEmail();
    })
    .catch((error) => {
      console.log('try to access home but could not preconnect');
      console.log(error);
      this.router.navigateByUrl('/');  
    });
  }


  onDisconnect() {
    this.session.disconnect();
    this.router.navigateByUrl('/');
  }
  
  onPatch() {
    this.session.updateName("yolo2")
    .then((response) => {
      console.log("name updated");
    })
    .catch((error) => {
      console.log(error);
    });
    this.session.updateEmail("yolo2@gmail.com")
    .then((response) => {
      console.log("mail updated");
    })
    .catch((error) => {
      console.log(error);
    });
    this.session.updatePassword("yolo2")
    .then((response) => {
      console.log("password updated");
    })
    .catch((error) => {
      console.log(error);
    });
  }

  onDelete() {
    this.session.delete()
    .then((response) => {
      this.router.navigateByUrl('/');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  onGetViewedMovies() {
    this.movies.getViewedMovies()
    .then((value) => {
      console.log(value);
    })
    .catch((value) => {
      console.log(value);
    });
  }

  onGetMovies() {
    this.movies.getMovies(1, 20)
    .then((value) => {
      console.log(value);
    })
    .catch((value) => {
      console.log(value);
    });
  }

  onGetSpecificMovies() {
    this.movies.getMovie("5dcfb530fb30a6da7a681267")
    .then((value) => {
      console.log(value);
    })
    .catch((value) => {
      console.log(value);
    });
  }

  onGenerateMovieList() {
    this.movies.generateMovieList()
    .then((value) => {
      console.log(value);
    })
    .catch((value) => {
      console.log(value);
    });
  }

  onSwapView() {
    this.movies.swapView("5dcfb530fb30a6da7a681267")
    .then((value) => {
      console.log(value);
    })
    .catch((value) => {
      console.log(value);
    });
  }
  onSwapLike() {
    this.movies.swapLike("5dcfb530fb30a6da7a681267")
    .then((value) => {
      console.log(value);
    })
    .catch((value) => {
      console.log(value);
    });
  }
}
