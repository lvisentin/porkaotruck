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
	public initials;

	constructor(
		private router: Router,
	) { }

	ionViewDidEnter() {
		this.user = JSON.parse(localStorage.getItem('user'));
		this.hasUser = !!localStorage.getItem('user');
		this.getInitials();
	}

	logout() {
		localStorage.removeItem('user');
		this.router.navigate(['tabs/home']);
	}

	getInitials() {
		if(this.user) {
			const initial = this.user.name.match(/\b(\w)/g);
			this.initials = initial[0];
			console.log(initial)
		}
		
	}

}
