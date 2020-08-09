import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  constructor() { }

  public carrinho = {
    itens: [
      {
        id: 1,
        nome: 'Porkão costela',
        descricao: 'teste',
        valor: 24.90,
        qtd: 3
      },
      {
        id: 2,
        nome: 'Porkão costela',
        descricao: 'teste',
        valor: 24.90,
        qtd: 2
      },
      {
        id: 3,
        nome: 'Porkão costela',
        descricao: 'teste',
        valor: 24.90,
        qtd: 1
      }
    ],
    subtotal: 24.90,
    taxaEntrega: 5,
    total: 29.9
  }

  ngOnInit() {
  }

}
