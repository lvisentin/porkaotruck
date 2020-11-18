import { Component, OnInit } from '@angular/core';
import { Ingrediente } from 'src/app/interfaces/ingrediente';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from 'src/app/services/produtos.service';
import { Produto } from 'src/app/interfaces/produto';
import { carrinho } from 'src/app/classes/carrinho';

@Component({
	selector: 'app-produto',
	templateUrl: './produto.page.html',
	styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {

	public ingredientes: Array<Produto> = [];

	public produto: Produto;
	public adicionais: Array<any> = [];
	public qtd = 1;
	private pId: number = this.ar.snapshot.params.id;

	public carrinho = carrinho;

	constructor(
		private ar: ActivatedRoute,
		private produtosService: ProdutosService,
		private router: Router,
	) { }

	ngOnInit() {
		this.getProduto(this.pId);
		this.getIngredientes();
	}

	getIngredientes() {
		const filter = {
			categoria: {
				nome: 'Adicional'
			}
		};
		console.log('filter', filter);
		this.produtosService.getProdutos(filter).subscribe(
			(data) => {
				const ingredientes: Array<Produto> = data.data.data;
				ingredientes.map((ingrediente) => {
					this.calculaPrecoItem(ingrediente);
				})
				this.ingredientes = ingredientes;
				
				console.log('ingredientes', ingredientes);
			}
		);
	}

	getProduto(pId) {
		this.produtosService.getProduto(pId).subscribe(
			(produto) => {
				this.calculaPrecoItem(produto.data);
				this.produto = produto.data;
			}
		);
	}

	adicionarAoCarrinho() {
		this.produto.qtd = this.qtd;
		if (this.adicionais.length > 0) { this.produto.adicionais = this.adicionais; }
		this.carrinho.adicionarItem(this.produto);
		localStorage.setItem('carrinho', JSON.stringify(carrinho));
		this.router.navigate(['tabs/carrinho']);
	}

	adicionar() {
		this.qtd++;
	}

	subtrair() {
		this.qtd--;
	}

	adicionarAdicional(adicional) {
		if (!this.adicionais.find(adc => adc.id == adicional.id)) {
			adicional.qtd = 1;
			this.adicionais.push(adicional);
		}
	}

	removerAdicional(adicional) {
		if (this.adicionais.find(adc => adc.id == adicional.id)) {
			const idxAdicional = this.adicionais.findIndex(adc => adc.id == adicional.id);
			delete this.adicionais.find(adc => adc.id == adicional.id).qtd;
			this.adicionais.splice(idxAdicional, 1);
		}
	}

	calculaPrecoItem(item) {
		console.log('item', item)
		if (item.preco[0].desconto_porc) {
    		const discountMultiplier =  1 - (item.preco[0].desconto_porc / 100)
			item.vltotal = (item.preco[0].preco * discountMultiplier);
		} else if (item.preco[0].desconto_num) {
			item.vltotal = (item.preco[0].preco - item.preco[0].desconto_num);
		} else {
			item.vltotal = item.preco[0].preco;
		}
    
	    if (item.adicionais) {
			item.adicionais.map((adicional) => {
				item.vltotal += adicional.adicional.preco[0].preco;
			})
		}
		return item.vltotal;
	}
}
