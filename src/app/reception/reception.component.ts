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
    this.loadScript('../assets/js/reception.js');
    this.session.preconnect()
    .then(() => {
      this.router.navigateByUrl('/home');

    })
    .catch(() => {

    });
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  login(){
    if(this.session.getToken()){
      window.location.pathname = '/home';
    }
    else window.location.pathname = '/login';

  }

}
