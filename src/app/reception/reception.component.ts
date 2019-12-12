import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {

  constructor(private router : Router, private session : SessionService) { }

  ngOnInit() {
    this.session.preconnect()
    .then(() => {
      this.router.navigateByUrl('/home');
    })
    .catch(() => {

    });
  }

}
