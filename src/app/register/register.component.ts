import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from '../session.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	angForm: FormGroup;

	constructor(private fb: FormBuilder, private session : SessionService) {
		this.createForm();
	}

	createForm() {
		this.angForm = this.fb.group({
			name: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required]
		})
	}

	isPswdOK = false;
	isEmailOK = false;
	password = "";
	@Input() emailStyle: object = {};
	@Input() passwordStyle: object = {};

	ngOnInit() {
		this.session.disconnect();
	}

	verifEmail(e) {
		let email = e.target.value;
		//console.log(email)
		if (email === "") {
			this.emailStyle = {};
		} else {
			if (/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(email)) {
				this.emailStyle = { border: '2px solid green' };
				this.isEmailOK = true;
			} else {
				this.emailStyle = { border: '2px solid red' };
			}
		}

	}

	setPassword(e) {
		this.password = e.target.value;
	}

	confirmPassword(e) {
		const secPassword = e.target.value;
		if (secPassword === "") {
			this.passwordStyle = {}
		} else {
			if (secPassword === this.password) {
				this.passwordStyle = { border: '2px solid green' };
				this.isPswdOK = true;
			} else {
				this.passwordStyle = { border: '2px solid red' };
			}

		}
	}

	validateSub() {
		console.log(this.angForm.value);
		this.session.register(this.angForm.value.name, this.angForm.value.email, this.angForm.value.password)
		.then(() => {
			console.log('created');
		})
		.catch(() => {
			console.log('failed');
		});
	}
}
