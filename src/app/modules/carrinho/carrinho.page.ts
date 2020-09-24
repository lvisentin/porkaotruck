import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
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

  constructor(
    private appcomponent: AppComponent,
    private popoverController: PopoverController,
    private router: Router,
    private carrinhoService: CarrinhoService,
    private pedidosService: PedidosService
  ) { }


  ionViewDidEnter() {
    const taxa = JSON.parse(localStorage.getItem('taxaEntrega'))
    console.log(taxa.vlpreco)
    carrinho.setTaxaEntrega(taxa.vlpreco);

    this.entregaMax = taxa.tempo_max;
    this.entregaMin = taxa.tempo_min;

  }

  ngOnInit() {
    this.carrinhoService.getMetodosPagamento()
      .subscribe(
        (metodosPgto) => {
          this.metodosPgto = metodosPgto['data'];
          console.log(this.metodosPgto)
        }
      )

    console.log(this.carrinho)
  }

  async presentPopoverOpt(ev: any, cpom,) {
    console.log('ev', ev)
    const popover = await this.popoverController.create({
      component: PopoverCarrinhoComponent,
      cssClass: 'popover-carrinho',
      event: ev,
      translucent: false
    })

    return await popover.present();
  }

  async presentPopoverSuccess(ev: any, cpom,) {
    console.log('ev', ev)
    const popover = await this.popoverController.create({
      component: PopoverSuccessComponent,
      cssClass: 'popover-success',
      event: ev,
      translucent: false
    })

    return await popover.present();
  }

  finalizaPedido() {
    if (!localStorage.getItem('user')) { this.router.navigate(['/login']) }

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
        }
      )

  }
}
