import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private session: SessionService, private router: Router) { }

  ngOnInit() {
  }

  onLogOut() {
    console.log('test')
    this.session.disconnect();
    this.router.navigateByUrl('/');
  }
}
