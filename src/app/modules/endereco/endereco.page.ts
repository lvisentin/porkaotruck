import { Component, OnInit, ViewChild, NgZone, AfterContentInit, AfterViewInit, OnDestroy  } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { EnderecoService } from 'src/app/services/endereco.service';
import { catchError, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

declare var google: any;


@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.page.html',
  styleUrls: ['./endereco.page.scss'],
})
export class EnderecoPage implements OnInit, AfterViewInit, OnDestroy {

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
	private readonly loadingController: LoadingController,
	public zone: NgZone,
  ) { }

  ngOnInit() {
	if (localStorage.getItem('taxaEntrega') && !localStorage.getItem('endereco')) { this.router.navigate(['tabs/home']); }
  }

  ngAfterViewInit() {
	console.log('google', google);
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
	await loading.present();

	const { role, data } = await loading.onDidDismiss();
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
	this.presentLoading();
	this.enderecoService.searchViaCep(endString)
		.pipe(takeUntil(this.instanceDestroys))
		.subscribe((result) => {
		const endereco = result[0];
		endereco.cep = result[0].cep.replace('-', '');

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
			this.enderecoService.findAndCreateUserEndereco(userEndereco)
			.pipe(takeUntil(this.instanceDestroys))
			.subscribe((resultado) => {
				const objDestinoOrigem = {
				origem: 'Rua Carlos Smith,10',
				destino: `${userEndereco.rua}, ${userEndereco.numero}`
				};

				this.enderecoService.getTaxaEntrega(objDestinoOrigem)
				.pipe(takeUntil(this.instanceDestroys))
				.subscribe((retorno) => {
					this.loadingController.dismiss();
					localStorage.setItem('endereco', JSON.stringify(resultado[0]));
					localStorage.setItem('taxaEntrega', JSON.stringify(retorno.data));
					this.router.navigate(['tabs/home']);
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
				localStorage.setItem('endereco', JSON.stringify(result[0]));
				localStorage.setItem('taxaEntrega', JSON.stringify(retorno.data));
				this.router.navigate(['tabs/home']);
			});
		}

		}, (err) => {
		console.log('ERROOOO', err);
		});

  }

  selectEndereco(endereco) {
	this.hasEndereco = true;

	this.endereco = endereco;
  }

  submitNumero() {
	const objEndereco = {
		origem: 'Rua Carlos Smith,10',
		destino: this.endereco.description
	};

	let endString = '';

	this.endereco.terms.reverse().map((term, index) => {
		if (isNaN(parseInt(term.value)) && term.value !== 'Brazil' && term.value !== 'Brasil' && index !== 3) {
		if (term.value === 'State of São Paulo') { endString += '/SP'; }
		else {
			endString += `/${term.value}`;
		}
		}
	});


	endString = endString.split(',')[0];

	console.log('endString', endString);
	endString += '/json';

	this.sendEndereco(endString);
  }


  cancelaEndereco() {
	this.hasEndereco = false;
	delete this.endereco;
  }
}
