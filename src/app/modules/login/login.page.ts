import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	constructor(
		private authenticationService: AuthenticationService,
		private router: Router
	) { }

	ngOnInit() {
	}

  	login() {
		this.authenticationService.login('gagaraikou@hotmail.com', 'raikou123')
		.pipe(first())
		.subscribe(
			data => {
				console.log('DEU BOM AQUI NO LOGIN');
				console.log(data);
			},
			error => {
				console.error('DEU MERDA');
				console.log(error);
			});
	}

	logout() {
		this.authenticationService.logout()
		.pipe(first())
		.subscribe(
			data => {
				console.log('DEU BOM AQUI NO LOGOUT');
				console.log(data);
			},
			error => {
				console.error('DEU MERDA');
				console.log(error);
			});
	  }

}
