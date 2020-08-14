import { Component, OnInit } from '@angular/core';
import { Ingrediente } from 'src/app/interfaces/ingrediente';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from 'src/app/services/produtos.service';
import { Produto } from 'src/app/interfaces/produto';
import { Carrinho } from 'src/app/classes/carrinho';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {

  public ingredientes: Array<Ingrediente> = [
    {
      id: 1,
      nome: 'Bacon',
      valor: 3.50
    },
    {
      id: 2,
      nome: 'Alface',
      valor: 1
    },
    {
      id: 3,
      nome: 'Queijo',
      valor: 4
    },
    {
      id: 4,
      nome: 'Molho especial',
      valor: 3.50
    },
  ]

  public produto: Produto;
  public carrinho: Carrinho = new Carrinho();
  public qtd: number = 1;
  private pId: number = this.ar.snapshot.params.id;

  constructor(
    private ar: ActivatedRoute,
    private produtosService: ProdutosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProduto(this.pId);
    console.log(this.qtd)
  }

  getProduto(pId) {
    this.produtosService.getProduto(pId).subscribe(
      (produto) => {
        this.produto = produto['data'];
        console.log(this.produto)
      }
    )
  }

  adicionarAoCarrinho() {
    const carrinho = {
      itens: [],
      subtotal: 0,
      total: 0,
      taxaEntrega: 0
    };

    this.produto.qtd = this.qtd;

    carrinho.itens.push(this.produto);
    carrinho.subtotal += this.produto.preco[0].preco;
    carrinho.total += this.produto.preco[0].preco;
    console.log(carrinho)
    localStorage.setItem('carrinho', JSON.stringify(carrinho))
    this.router.navigate(['tabs/carrinho']);
    // this.carrinho.adicionarItem(this.produto);
    // console.log('this carrinho', this.carrinho)

  }

  adicionar() {
    this.qtd++;
  }

  subtrair() {
    this.qtd--;
  }


}
