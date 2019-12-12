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

  ngOnInit() {
    this.session.preconnect()
    .then(() => {
      
    })
    .catch(() => {
      console.log('try to access home but could not preconnect');
      //this.router.navigateByUrl('/');  
    });
  }

  onDisconnect() {
    this.session.disconnect();
    this.router.navigateByUrl('/');
  }
  
}
