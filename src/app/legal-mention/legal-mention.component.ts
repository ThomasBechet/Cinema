import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-legal-mention',
  templateUrl: './legal-mention.component.html',
  styleUrls: ['./legal-mention.component.scss']
})
export class LegalMentionComponent implements OnInit {

  constructor(private session : SessionService, private router : Router) { }

  ngOnInit() {
    this.session.preconnect()
    .then((response) => {
      
    })
    .catch((error) => {
      console.log('try to access home but could not preconnect');
      console.log(error);
      this.router.navigateByUrl('/');  
    });
  }

}
