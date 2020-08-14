import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverCarrinhoComponent } from 'src/app/shared/popover/popover-carrinho/popover-carrinho.component';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  constructor(
    private popoverController: PopoverController
  ) { }

  public carrinho;
  public metodoPagamento: string;

  ngOnInit() {
    this.setCarrinho();

  }

  setCarrinho() {
    this.carrinho = JSON.parse(localStorage.getItem('carrinho'));
    console.log(this.carrinho)
  }

  async presentPopover(ev: any) {
    console.log('ev', ev)
    const popover = await this.popoverController.create({
      component: PopoverCarrinhoComponent,
      cssClass: 'popover-carrinho',
      event: ev,
      translucent: false
    })

    return await popover.present();
  }

  finalizaPedido() {
    console.log(this.metodoPagamento)
    this.carrinho.itens.forEach((value, index) => {

    })
    const pedido = {
      "idusuario": 10,
      "itens": [
        {
          "idproduto": 1,
          "quantidade": 1,
          "vltotal": 15,
          "vlsubtotal": 5,
          "vladicional": 10,
          "adicionais": [
            {
              "idadicional": 2,
              "quantidade": 1,
              "vltotal": 10,
              "vlsubtotal": 10
            }
          ]
        },
        {
          "idproduto": 2,
          "quantidade": 2,
          "vltotal": 20,
          "vlsubtotal": 20
        }
      ],
      "vltotal": 40,
      "vlsubtotal": 35,
      "vltaxa_entrega": 5,
      "idforma_pagamento": 1
    }
  }
}
