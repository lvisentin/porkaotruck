import { PorkaoResponse } from './../../interfaces/response.model';
import { takeUntil } from 'rxjs/operators';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { PopoverCarrinhoComponent } from 'src/app/shared/popover/popover-carrinho/popover-carrinho.component';
import { Router } from '@angular/router';
import { Carrinho, carrinho } from 'src/app/classes/carrinho';
import { AppComponent } from 'src/app/app.component';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage {

  public carrinho = this.appcomponent.carrinho;
  // public carrinho = carrinho;
  private userEndereco;
  public metodoPagamento: number;
  public metodosPgto;
  public entregaMin;
  public entregaMax;
  public user;
  public endereco;
  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private appcomponent: AppComponent,
    private popoverController: PopoverController,
    private router: Router,
    private carrinhoService: CarrinhoService,
    private pedidosService: PedidosService,
    private readonly loadingController: LoadingController,
    private readonly alertController: AlertController,
    private readonly userService: UserService
  ) { }


  ionViewDidEnter() {
    console.log(this.carrinho);
    this.user = JSON.parse(localStorage.getItem('user'));

    const taxa = JSON.parse(localStorage.getItem('taxaEntrega'));

    carrinho.setTaxaEntrega(taxa.vlpreco);
    carrinho.calculaTotal();

    this.entregaMax = taxa.tempo_max;
    this.entregaMin = taxa.tempo_min;

    this.userEndereco = JSON.parse(localStorage.getItem('userEndereco'));
    this.endereco = JSON.parse(localStorage.getItem('endereco'));

  }

  ngOnInit() {
    this.carrinhoService.getMetodosPagamento()
      .subscribe(
        (metodosPgto) => {
          // tslint:disable-next-line: no-string-literal
          this.metodosPgto = metodosPgto['data'];
          console.log(this.metodosPgto);
        }
      );

    console.log(this.carrinho);
  }

  async presentPopoverOpt(idProd: any) {
    console.log('ev', idProd);
    const popover = await this.popoverController.create({
      component: PopoverCarrinhoComponent,
      cssClass: 'popover-carrinho',
      // event: ev,
      translucent: false,
    });

    const { data } = await popover.onDidDismiss();
    console.log('data', data);

    return await popover.present();
  }

  async presentAlertSuccess(ev: any = null) {
    const alert = await this.alertController.create({
      header: 'Pedido Concluído',
      message: 'Seu pedido foi concluído com sucesso!',
      buttons: ['OK']

    });
    await alert.present();
  }

  async presentAlertError(ev: any = null, msg) {
    const alert = await this.alertController.create({
      header: 'Ocorreu um erro',
      message: msg,
      buttons: ['OK']

    });
    await alert.present();
  }

  async presentAlertConfirm(item) {
    console.log('item', item);
    const alert = await this.alertController.create({
      header: 'Remover item',
      message: `Deseja remover o item ${item.nome} do carrinho?`,
      buttons: [{
        text: 'Cancelar',
        handler: () => {
          this.alertController.dismiss();
        }
      },
      {
        text: 'Sim',
        handler: () => {
          this.removeItem(item);
        }
      }]

    });
    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'loading-pedido',
      message: 'Finalizando pedido...',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  removeItem(item) {
    this.carrinho.removerItem(item);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  finalizaPedido() {
    if (!localStorage.getItem('user')) { this.router.navigate(['/login']) }
    this.presentLoading();

    const user = JSON.parse(localStorage.getItem('user'));
    // const userEndereco = JSON.parse(localStorage.getItem('userEndereco'))


    console.log('nao tem user endereco', this.endereco)

    const userEndereco = {
      rua: this.endereco.logradouro,
      numero: this.endereco.numero,
      bairro: this.endereco.bairro,
      cidade: this.endereco.localidade,
      uf: this.endereco.uf,
      pais: 'Brasil',
      cep: this.endereco.cep
    };
    this.userService.findAndCreateUserEndereco(userEndereco, user)
      .pipe(takeUntil(this.destroy))
      .subscribe((result: PorkaoResponse) => {
        console.log('result')
        // localStorage.setItem('userEndereco', JSON.stringify(result.data));
        const userendereco2 = result.data

        const pedido = {
          "idendereco": userendereco2['idendereco'],
          "idusuario": user.id,
          "itens": this.carrinho.returnItensApi(),
          "vltotal": this.carrinho.getVlTotal(),
          "vlsubtotal": this.carrinho.getVlSubtotal(),
          "vltaxa_entrega": this.carrinho.getVlTaxaEntrega(),
          "idforma_pagamento": this.metodoPagamento
        }
    
        console.log(pedido)
    
        this.pedidosService.createPedido(pedido)
          .subscribe(
            (pedido) => {
              console.log('pedido', pedido)
              this.loadingController.dismiss();
              this.presentAlertSuccess();
    
              this.carrinho.limpaCarrinho();
              localStorage.removeItem('carrinho');
    
              this.router.navigate(['tabs/home']);
    
            }, (err) => {
              console.log('err', err)
              this.loadingController.dismiss();
              this.presentAlertError(null, err.message);
            }
          )

      })

    // if (userEndereco) {
    //   this.userEndereco = userEndereco;
    // } else {
    //   const userEndereco = {
    //     rua: this.endereco.logradouro,
    //     numero: this.endereco.numero,
    //     bairro: this.endereco.bairro,
    //     cidade: this.endereco.localidade,
    //     uf: this.endereco.uf,
    //     pais: 'Brasil',
    //     cep: this.endereco.cep
    //   };
    //   console.log(userEndereco)
    //   this.userService.findAndCreateUserEndereco(userEndereco, user)
    //     .pipe(takeUntil(this.destroy))
    //     .subscribe((result: PorkaoResponse) => {
    //       console.log('result')
    //       localStorage.setItem('userEndereco', JSON.stringify(result.data));
    //     })
    // }


    console.log('userendereco', this.userEndereco)

    
  }

  removerItem(item) {
    this.carrinho.removerItem(item);
  }
}
