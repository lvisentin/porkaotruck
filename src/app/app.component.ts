import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { carrinho } from './classes/carrinho';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

	public carrinho = carrinho;

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			FCM.onNotification().subscribe(data => {
				if (data.wasTapped) {
					console.log('Received in background');
				} else {
					console.log('Received in foreground');
				}
			});

			FCM.getToken().then(token => {
				console.log('TOOOOKEN');
				console.log(token);
			});

			FCM.onTokenRefresh().subscribe(token => {
				console.log('REFRESH');
				console.log(token);
			});

			this.statusBar.styleDefault();
			this.splashScreen.hide();

			const storageCarrinho = JSON.parse(localStorage.getItem('carrinho'));

			if (storageCarrinho) {
				this.carrinho.setItens(storageCarrinho.itens);
				this.carrinho.setSubTotal(storageCarrinho.subtotal);
				this.carrinho.setTaxaEntrega(storageCarrinho.taxaEntrega);
				this.carrinho.calculaTotal();
			}
		});
	}
}
