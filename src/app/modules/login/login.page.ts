import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	public loginForm = this.formBuilder.group({
		email: ['', Validators.required],
		password: ['', Validators.required],
	});

	public errors;

	constructor(
		private authenticationService: AuthenticationService,
		private router: Router,
		private formBuilder: FormBuilder,
		private loadingController: LoadingController
	) { }

	ngOnInit() {
	}

	async presentLoading() {
		const loading = await this.loadingController.create({
		  cssClass: 'loading-pedido',
		  message: 'Autenticando...',
		});
		await loading.present();
	}

	login() {
		this.presentLoading();
		this.errors = null;
		this.authenticationService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
			.pipe(first())
			.subscribe(
				data => {
					this.loadingController.dismiss();
					this.router.navigate(['/tabs/home']);
					console.log('DEU BOM AQUI NO LOGIN');
					console.log(data);
				},
				error => {
					this.loadingController.dismiss();
					this.errors = error;
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
					this.errors = error;
					console.error('DEU MERDA');
					console.log(error);
				});
	}

	register() {
		this.router.navigate(['/register']);
	}

}
