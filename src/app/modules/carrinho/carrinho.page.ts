import { Component, OnInit } from '@angular/core';
import { LoadingController, PopoverController } from '@ionic/angular';
import { PopoverCarrinhoComponent } from 'src/app/shared/popover/popover-carrinho/popover-carrinho.component';
import { Router } from '@angular/router';
import { carrinho } from 'src/app/classes/carrinho';
import { AppComponent } from 'src/app/app.component';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { PopoverSuccessComponent } from 'src/app/shared/popover/popover-success/popover-success.component';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage {

  // public carrinho = this.appcomponent.carrinho
  public carrinho = carrinho;
  public metodoPagamento: number;
  public metodosPgto;
  public entregaMin;
  public entregaMax;
  public user;
  public endereco;

  constructor(
    private appcomponent: AppComponent,
    private popoverController: PopoverController,
    private router: Router,
    private carrinhoService: CarrinhoService,
    private pedidosService: PedidosService,
    private readonly loadingController: LoadingController
  ) { }


  ionViewDidEnter() {
    this.user = JSON.parse(localStorage.getItem("user"));

    const taxa = JSON.parse(localStorage.getItem('taxaEntrega'))

    console.log(taxa.vlpreco)
    carrinho.setTaxaEntrega(taxa.vlpreco);

    this.entregaMax = taxa.tempo_max;
    this.entregaMin = taxa.tempo_min;

  }

  ngOnInit() {
    this.endereco = JSON.parse(localStorage.getItem('endereco'));
    this.carrinhoService.getMetodosPagamento()
      .subscribe(
        (metodosPgto) => {
          this.metodosPgto = metodosPgto['data'];
          console.log(this.metodosPgto)
        }
      )

    console.log(this.carrinho)
  }

  async presentPopoverOpt(ev: any) {
    console.log('ev', ev)
    const popover = await this.popoverController.create({
      component: PopoverCarrinhoComponent,
      cssClass: 'popover-carrinho',
      // event: ev,
      translucent: false
    })

    const { data } = await popover.onDidDismiss();
    console.log('data', data)

    return await popover.present();
  }

  async presentPopoverSuccess(ev: any = null) {
    // console.log('ev', ev)
    const popover = await this.popoverController.create({
      component: PopoverSuccessComponent,
      cssClass: 'popover-success',
      // event: ev,
      translucent: false
    })

    return await popover.present();
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
  }

  finalizaPedido() {
    if (!localStorage.getItem('user')) { this.router.navigate(['/login']) }
    this.presentLoading();

    const user = JSON.parse(localStorage.getItem('user'));

    const pedido = {
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
          this.presentPopoverSuccess();
        }, (err) => {
          this.loadingController.dismiss();
        }
      )

  }
}
