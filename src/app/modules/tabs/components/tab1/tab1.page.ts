import { Component } from '@angular/core';
import { Combo } from 'src/app/interfaces/combo';
import { Categoria } from 'src/app/interfaces/categoria';
import { Lanche } from 'src/app/interfaces/lanche';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public slideOpts = {
    initialSlide: 1,
    slidesPerView: 2,
    speed: 400
  }

  public categoriaSelecionada: number;

  public combos: Combo[] = [
    {
      nome: 'Porkão bacon',
      src: 'assets/img/xbacon.jpg'
    },
    {
      nome: 'Porkão bacon',
      src: 'assets/img/xbacon.jpg'
    },
    {
      nome: 'Porkão bacon',
      src: 'assets/img/xbacon.jpg'
    },
    {
      nome: 'Porkão bacon',
      src: 'assets/img/xbacon.jpg'
    }
  ];


  public categorias: Categoria[] = [
    {
      id: 1,
      nome: 'Lanches'
    },
    {
      id: 2,
      nome: 'Kids'
    },
    {
      id: 3,
      nome: 'Bebidas'
    },
    {
      id: 4,
      nome: 'Sobremesas'
    }
  ]


  public lanches: Lanche[] = [
    {
      id: 1,
      nome: 'Porkão costela',
      descricao: 'teste',
      valor: 24.90,
      imagem: '/assets/img/xbacon.jpg',
      ingredientes: [
        {
          id: 1,
          nome: 'pão',
          valor: 0
        },
        {
          id: 2,
          nome: 'hamburger',
          valor: 0
        },
      ]
    },
    {
      id: 2,
      nome: 'Porkão costela',
      descricao: 'teste',
      valor: 24.90,
      imagem: '/assets/img/xbacon.jpg',
      ingredientes: [
        {
          id: 1,
          nome: 'pão',
          valor: 0
        },
        {
          id: 2,
          nome: 'hamburger',
          valor: 0
        },
      ]
    },
    {
      id: 3,
      nome: 'Porkão costela',
      descricao: 'teste',
      valor: 24.90,
      imagem: '/assets/img/xbacon.jpg',
      ingredientes: [
        {
          id: 1,
          nome: 'pão',
          valor: 0
        },
        {
          id: 2,
          nome: 'hamburger',
          valor: 0
        },
      ]
    }
  ]

  constructor() { }

  ionViewDidEnter() {
    this.categoriaSelecionada = 1;
  }

  selectCategoria(categoria) {
    this.categoriaSelecionada = categoria;
  }

}
