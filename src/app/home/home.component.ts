import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private session: SessionService, private router : Router) { }

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
    this.session.update("test2", "test2@gmail.com", "password")
    .then((response) => {
      console.log("success");
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
