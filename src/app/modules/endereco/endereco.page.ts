import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { EnderecoService } from 'src/app/services/endereco.service';
import { catchError, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

declare var google: any;


@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.page.html',
  styleUrls: ['./endereco.page.scss'],
})
export class EnderecoPage implements OnInit {

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
    private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('taxaEntrega')) { this.router.navigate(['tabs/home']) };
  }

  ngAfterViewInit() {
    console.log('google', google)
  }

  ngOnDestroy() {
    this.instanceDestroys.next(true);
    this.instanceDestroys.unsubscribe();
  }

  mountForm() {
    this.enderecoForm = this.formBuilder.group({
      endereco: ['', Validators.required]
    })
  }

  searchChanged() {

    const options = { input: this.inputEndereco, componentRestrictions: { country: "br" }, types: ['geocode'] };

    console.log(this.inputEndereco)
    if (!this.inputEndereco.trim().length) return;
    this.searchResults = [];
    this.googleAutoComplete.getPlacePredictions(options, predictions => {
      this.searchResults = predictions;
      console.log(this.searchResults)
    })

  }


  sendEndereco(endString) {
    this.enderecoService.searchViaCep(endString)
      .pipe(takeUntil(this.instanceDestroys))
      .subscribe((result) => {
        let endereco = result[0];
        endereco['cep'] = result[0]['cep'].replace('-', '');

        const userEndereco = {
          rua: endereco['logradouro'],
          numero: this.numero,
          bairro: endereco['bairro'],
          cidade: endereco['localidade'],
          uf: endereco['uf'],
          pais: 'Brasil',
          cep: endereco['cep']
        };
        if (localStorage.getItem('user')) {
          this.enderecoService.findAndCreateUserEndereco(userEndereco)
            .pipe(takeUntil(this.instanceDestroys))
            .subscribe((resultado) => {

              const objDestinoOrigem = {
                origem: "Rua Carlos Smith,10",
                destino: `${userEndereco.rua}, ${userEndereco.numero}`
              }

              this.enderecoService.getTaxaEntrega(objDestinoOrigem)
                .pipe(takeUntil(this.instanceDestroys))
                .subscribe((retorno) => {
                  localStorage.setItem('taxaEntrega', JSON.stringify(retorno['data']));
                  this.router.navigate(['tabs/home']);
                })
            })
        } else {
          const objDestinoOrigem = {
            origem: "Rua Carlos Smith,10",
            destino: `${userEndereco.rua}, ${userEndereco.numero}`
          }

          this.enderecoService.getTaxaEntrega(objDestinoOrigem)
            .pipe(takeUntil(this.instanceDestroys))
            .subscribe((retorno) => {
              localStorage.setItem('taxaEntrega', JSON.stringify(retorno['data']));
              this.router.navigate(['tabs/home']);
            })
        }

      }, (err) => {
        console.log('ERROOOO', err)
      })

  }

  selectEndereco(endereco) {
    this.hasEndereco = true;

    this.endereco = endereco;
  }

  submitNumero() {
    const objEndereco = {
      "origem": "Rua Carlos Smith,10",
      "destino": this.endereco.description
    }

    let endString: string = '';

    this.endereco.terms.reverse().map((term, index) => {
      if (isNaN(parseInt(term.value)) && term.value !== 'Brasil' && index !== 3) { endString += `/${term.value}` }
    })

    endString = endString.split(',')[0];

    endString += '/json';

    this.sendEndereco(endString);
  }

}
