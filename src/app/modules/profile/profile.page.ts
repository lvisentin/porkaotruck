import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

	public user;
	public hasUser: boolean;

	constructor(
		private router: Router,
	) { }

	ionViewDidEnter() {
		this.user = JSON.parse(localStorage.getItem('user'));
		this.hasUser = !!localStorage.getItem('user');
	}

	logout() {
		localStorage.removeItem('user');
		this.router.navigate(['tabs/home']);
	}

}
