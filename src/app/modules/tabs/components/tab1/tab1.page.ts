import { Component } from '@angular/core';
import { Combo } from 'src/app/interfaces/combo';
import { Categoria } from 'src/app/interfaces/categoria';
import { Lanche } from 'src/app/interfaces/lanche';
import { ProdutosService } from 'src/app/services/produtos.service';
import { Produto } from 'src/app/interfaces/produto';
import { CategoriasService } from 'src/app/services/categorias.service';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';

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

  // public combos: Combo[] = [
  //   {
  //     nome: 'Porkão bacon',
  //     src: 'assets/img/xbacon.jpg'
  //   },
  //   {
  //     nome: 'Porkão bacon',
  //     src: 'assets/img/xbacon.jpg'
  //   },
  //   {
  //     nome: 'Porkão bacon',
  //     src: 'assets/img/xbacon.jpg'
  //   },
  //   {
  //     nome: 'Porkão bacon',
  //     src: 'assets/img/xbacon.jpg'
  //   }
  // ];


  public combos: Produto[];

  public categorias: Categoria[];
  public categoriasShowable: Categoria[];
  // public produtos: Lanche[] = [
  //   {
  //     id: 1,
  //     nome: 'Porkão costela',
  //     descricao: 'teste',
  //     valor: 24.90,
  //     imagem: '/assets/img/xbacon.jpg',
  //     ingredientes: [
  //       {
  //         id: 1,
  //         nome: 'pão',
  //         valor: 0
  //       },
  //       {
  //         id: 2,
  //         nome: 'hamburger',
  //         valor: 0
  //       },
  //     ]
  //   },
  //   {
  //     id: 2,
  //     nome: 'Porkão costela',
  //     descricao: 'teste',
  //     valor: 24.90,
  //     imagem: '/assets/img/xbacon.jpg',
  //     ingredientes: [
  //       {
  //         id: 1,
  //         nome: 'pão',
  //         valor: 0
  //       },
  //       {
  //         id: 2,
  //         nome: 'hamburger',
  //         valor: 0
  //       },
  //     ]
  //   },
  //   {
  //     id: 3,
  //     nome: 'Porkão costela',
  //     descricao: 'teste',
  //     valor: 24.90,
  //     imagem: '/assets/img/xbacon.jpg',
  //     ingredientes: [
  //       {
  //         id: 1,
  //         nome: 'pão',
  //         valor: 0
  //       },
  //       {
  //         id: 2,
  //         nome: 'hamburger',
  //         valor: 0
  //       },
  //     ]
  //   }
  // ]

  public grupoProduto;

  public produtos;

  constructor(
    private produtosService: ProdutosService,
    private categoriasService: CategoriasService
  ) { }

  ionViewDidEnter() {
    this.categoriaSelecionada = 1;
    this.getCategorias();
    this.getCombos();
  }

  selectCategoria(categoria) {
    this.categoriaSelecionada = categoria;
  }

  getCategorias() {
    const fields = { "produtos": ["nome", "descricao", "url_image"] };
    const filter = { "showable": true }
    this.categoriasService.getCategorias(filter, fields).subscribe(
      (data) => {
        const categorias = data['data'].data;
        this.categorias = categorias;
        console.log(this.categorias)
      }
    )
  }

  getCombos() {
    const filter = { "categoria": 31 };
    this.produtosService.getProdutos(filter).subscribe(
      (data) => {
        const combos: Array<Produto> = data['data'].data;
        this.combos = combos;
        console.log(combos)
      }
    )
  }

}
