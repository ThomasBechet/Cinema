import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  angForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private session: SessionService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.loadScript('../assets/js/login.js');
    this.loadScript('../assets/js/anime.js');
    this.session.disconnect();
  }

  verifConnection() {
    this.session.connect(this.angForm.value.email, this.angForm.value.password)
      .then((response) => {

        if (response['errorMsg']) {
          console.log('bad password');
        } else {
          // this.router.navigateByUrl('/home');
          window.location.pathname = '/home';
        }

        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        alert("Bad identification");
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
}
