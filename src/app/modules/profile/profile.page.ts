import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public user;
  public hasUser: boolean;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.hasUser = true;
  }

  ionViewDidEnter() {
    if( !localStorage.getItem('user') ) {
      this.hasUser = false;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['tabs/home']);
    // location.reload();
  }

}
