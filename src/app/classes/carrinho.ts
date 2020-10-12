import { Produto } from '../interfaces/produto';

class Carrinho {
	private itens: Produto[] = [];
	private subtotal = 0;
	private total = 0;
	private taxaEntrega = 0;

	constructor() {
	}

	returnItensApi() {
		const itensApi = this.itens.map((item: Produto) => {
			const itemFormatado = {
				idproduto: item.id,
				quantidade: item.qtd,
				vlsubtotal: item.preco[0].preco,
				vladicionais: 0,
				vltotal: item.vltotal,
				adicionais: []
			};

			if (item.adicionais) {
				itemFormatado.adicionais = item.adicionais.map((adicional: Produto) => {
					const adicionalFormatado = {
						idadicional: adicional.id,
						quantidade: adicional.qtd,
						vltotal: adicional.preco[0].preco,
						vlsubtotal: adicional.preco[0].preco,
					};
					return adicionalFormatado;
				});


				itemFormatado.vladicionais = itemFormatado.adicionais.reduce((acc, adicional: Produto) => {
					return acc + adicional.vltotal;
				}, 0);

			} else { delete itemFormatado.adicionais; }
			
			return itemFormatado;
		});

		return itensApi;
	}

	getItens() {
		return this.itens;
	}

	getVlTotal() {
		return this.total;
	}

	getVlSubtotal() {
		return this.subtotal;
	}

	getVlTaxaEntrega() {
		return this.taxaEntrega;
	}

	adicionarItem(item: Produto) {
		console.log('item', item)
		item.vltotal = item.preco[0].preco * item.qtd;
		
		console.log('preco x qtd', item.preco[0].preco * item.qtd)
		if (item.adicionais) {
			const valorAdicionais = item.adicionais.reduce((total, adicional) => {
				return total + adicional.preco[0].preco;
			}, 0);

			item.vltotal += valorAdicionais;
		}
		
		if (this.itens.length >= 1) {
			let repeatItem = this.itens.find(value => value.id == item.id && JSON.stringify(value.adicionais) == JSON.stringify(item.adicionais));
			
			if (repeatItem) {
				repeatItem.qtd += item.qtd;
				repeatItem.vltotal = repeatItem.vltotal * repeatItem.qtd;
			} else {
				this.itens.push(item);
			}

		} else {
			this.itens.push(item);
		}

		this.subtotal += item.vltotal;
		this.calculaTotal();
	}

	calculaTotal() {
		this.total = this.subtotal + this.taxaEntrega;
	}

	setSubTotal(subtotal) {
		this.subtotal = subtotal;
	}

	removerItem(item: Produto) {
		const carrinhoItem = this.itens.find(carrinhoItem => carrinhoItem == item);
		console.log('carrinhoItem', carrinhoItem);
	}

	setTaxaEntrega(taxa) {
		this.taxaEntrega = taxa;
	}

	setItens(itens) {
		this.itens = itens;
	}

}

export const carrinho = new Carrinho();

