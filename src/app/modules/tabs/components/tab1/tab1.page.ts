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


  public categorias: Categoria[];

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
  }

  selectCategoria(categoria) {
    this.categoriaSelecionada = categoria;
  }

  getCategorias() {
    this.categoriasService.getCategorias().subscribe(
      (data) => {
        const categorias = data['data'].data;
        console.log('categorias', categorias)
        this.categorias = categorias;
        this.getProdutos();
      }
    )
  }

  getProdutos() {
    this.produtosService.getProdutos().subscribe(
      (data) => {
        const produtos: Array<Produto> = data['data'].data;
        this.produtos = produtos;

        const arrCat = [];
        this.categorias.forEach((categoria, i1) => {
          const catObj = {
            categoria: categoria,
            content: []
          }
          produtos.filter(produto => {
            if (produto.idcategoria == categoria.id) {
              catObj.content.push(produto);
            }
          })

          arrCat.push(catObj);
        })
        this.grupoProduto = arrCat;
        console.log(this.grupoProduto)
      }
    )
  }

}
