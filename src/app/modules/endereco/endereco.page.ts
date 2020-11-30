import { Component, OnInit, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EnderecoService } from 'src/app/services/endereco.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { PorkaoResponse } from 'src/app/interfaces/response.model';

declare var google: any;


@Component({
	selector: 'app-endereco',
	templateUrl: './endereco.page.html',
	styleUrls: ['./endereco.page.scss'],
})
export class EnderecoPage implements OnDestroy {

	public enderecoForm;
	public inputEndereco;
	public searchResults: Array<any> = [];
	public endereco;
	public hasEndereco = false;
	public readonly instanceDestroys = new Subject<boolean>();
	public numero;

	private googleAutoComplete = new google.maps.places.AutocompleteService();
	@ViewChild('addresstext') addresstext: any;


	constructor(
	private formBuilder: FormBuilder,
	private enderecoService: EnderecoService,
	private router: Router,
	public zone: NgZone,
	private userService: UserService,
	private readonly loadingController: LoadingController,
	private readonly alertController: AlertController,
	) { }

	ionViewDidEnter() {
		this.endereco = JSON.parse(localStorage.getItem('endereco'));
		// if(localStorage.getItem())
	}

	ngOnDestroy() {
		this.instanceDestroys.next(true);
		this.instanceDestroys.unsubscribe();
	}

	async presentLoading() {
		const loading = await this.loadingController.create({
			cssClass: 'loading-endereco',
			message: 'Buscando endereço...',
		});

		return loading.present();
	}

	async presentAlertError(msg) {
		//
		const alert = await this.alertController.create({
			header: 'Oops!',
			message: msg,
			buttons: ['OK']

		});
		await alert.present();
	}

	mountForm() {
		this.enderecoForm = this.formBuilder.group({
			endereco: ['', Validators.required]
		});
	}

	searchChanged(e) {
		this.searchResults = [];
		if (!e.target.value.trim().length) { return; }
		const options = { input: e.target.value, componentRestrictions: { country: 'br' }, types: ['geocode'] };
		this.googleAutoComplete.getPlacePredictions(options, predictions => {
			this.zone.run(() => {
			this.searchResults = predictions;
			});
		});
	}

	sendEndereco(endString) {
		this.presentLoading().then(() => {
			this.enderecoService.searchViaCep(endString)
			.pipe(takeUntil(this.instanceDestroys))
			.subscribe((result) => {
				if (!result[0].logradouro) {
					this.loadingController.dismiss();
					this.presentAlertError('Informe sua rua por favor!');
					return throwError('Informe sua rua por favor!');
				}
				const endereco = result[0];
				endereco.cep = result[0].cep.replace('-', '');
				endereco.numero = this.numero;
				
				const userEndereco = {
					rua: endereco.logradouro,
					numero: this.numero,
					bairro: endereco.bairro,
					cidade: endereco.localidade,
					uf: endereco.uf,
					pais: 'Brasil',
					cep: endereco.cep
				};

				if (localStorage.getItem('user')) {
					this.userService.findAndCreateUserEndereco(userEndereco)
						.pipe(takeUntil(this.instanceDestroys))
						.subscribe((resultado: PorkaoResponse) => {
						localStorage.setItem('userEndereco', JSON.stringify(resultado.data));
						const objDestinoOrigem = {
							origem: 'Rua Carlos Smith,10',
							destino: `${userEndereco.rua}, ${userEndereco.numero}`
						};

						this.enderecoService.getTaxaEntrega(objDestinoOrigem)
							.pipe(takeUntil(this.instanceDestroys))
							.subscribe((retorno) => {
								this.loadingController.dismiss();
								localStorage.setItem('endereco', JSON.stringify(endereco));
								localStorage.setItem('taxaEntrega', JSON.stringify(retorno.data));
								this.router.navigate(['tabs/home']);
						}, (err) => {
							this.loadingController.dismiss();
							this.cancelaEndereco();
							this.presentAlertError('Ainda não atendemos esse local!');
							return throwError('Ainda não atendemos esse local!');
						});
					});
				} else {
					const objDestinoOrigem = {
						origem: 'Rua Carlos Smith,10',
						destino: `${userEndereco.rua}, ${userEndereco.numero}`
					};
					this.enderecoService.getTaxaEntrega(objDestinoOrigem)
						.pipe(takeUntil(this.instanceDestroys))
						.subscribe((retorno) => {

							this.loadingController.dismiss();
							localStorage.setItem('endereco', JSON.stringify(endereco));
							localStorage.setItem('taxaEntrega', JSON.stringify(retorno.data));
							this.router.navigate(['tabs/home']);
						}, (err) => {
							this.loadingController.dismiss();
							this.cancelaEndereco();
							this.presentAlertError('Ainda não atendemos esse local!');
							return throwError('Ainda não atendemos esse local!');
						});
				}

			}, (err) => {

			});
		});

	}

	selectEndereco(endereco) {
		this.hasEndereco = true;

		this.endereco = endereco;
	}

	submitNumero() {
		let endString = '';

		this.endereco.terms.reverse().map((term, index) => {
			if (
				isNaN(parseInt(term.value))
				&& term.value !== 'Brazil'
				&& term.value !== 'Brasil'
			) {
				if (term.value === 'State of São Paulo') {
					endString += '/SP';
				}
				else if (index >= 3 && index === (this.endereco.terms.length - 1)) {
					endString += `/${term.value.replace(' ', '+').replace('.', '')}`;
				}else if (index < 3){
					console.log(term.value)
					endString += `/${term.value.replace(' ', '+').replace('.', '')}`;
				}
			}
		});

		endString = endString.split(',')[0];

		endString += '/json';

		this.sendEndereco(endString);
	}

	cancelaEndereco() {
		this.hasEndereco = false;
		delete this.endereco;
	}
}
