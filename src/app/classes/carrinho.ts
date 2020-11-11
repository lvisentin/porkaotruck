import { Produto } from '../interfaces/produto';

export class Carrinho {
	private itens: Produto[] = [];
	private subtotal = 0;
	private total = 0;
	private taxaEntrega = 0;

	constructor() {
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

	setTaxaEntrega(taxa) {
		this.taxaEntrega = taxa;
	}

	setItens(itens) {
		this.itens = itens;
	}

	setSubTotal(subtotal) {
		this.subtotal = subtotal;
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

	adicionarItem(item: Produto) {
		console.log('item', item)
		item.vltotal = this.calculaPrecoItem(item);

		if (this.itens.length >= 1) {
			let repeatItem = this.itens.find(value => value.id == item.id && JSON.stringify(value.adicionais) == JSON.stringify(item.adicionais));
			
			if (repeatItem) {
				repeatItem.qtd += item.qtd;
				// repeatItem.vltotal = repeatItem.vltotal * repeatItem.qtd;
				repeatItem.vltotal = this.calculaPrecoItem(repeatItem);
			} else {
				this.itens.push(item);
			}

		} else {
			this.itens.push(item);
		}

		this.subtotal += item.vltotal;
		this.calculaTotal();
	}

	calculaPrecoItem(item) {
		if (item.preco[0].desconto_porc) {
			console.log('tem preco porc', item.preco[0].desconto_porc)
			const discountMultiplier =  1 - (item.preco[0].desconto_porc / 100)
			item.vltotal = (item.preco[0].preco * discountMultiplier) * item.qtd;
		} else if (item.preco[0].desconto_num) {
			item.vltotal = (item.preco[0].preco - item.preco[0].desconto_num) * item.qtd;
		} else {
			item.vltotal = item.preco[0].preco * item.qtd;
		}

		if (item.adicionais) {
			item.adicionais.map((adicional) => {
				item.vltotal += adicional.preco[0].preco;
			})
		}
		
		return item.vltotal;
	}

	calculaSubtotal() {
		const vlSubtotal = this.itens.reduce((acc, value) => {
			acc += value.vltotal;
			return acc;
		}, 0);
		this.setSubTotal(vlSubtotal);
	}

	calculaTotal() {
		this.calculaSubtotal();
		this.total = this.subtotal + this.taxaEntrega;
	}

	removerItem(item: Produto) {
		// const carrinhoItem = this.itens.find(carrinhoItem => JSON.stringify(carrinhoItem) == JSON.stringify(item));
		const carrinhoIndex = this.itens.indexOf(item)
		console.log('carrinhoItem', carrinhoIndex);
		this.itens.splice(carrinhoIndex, 1);
		this.calculaTotal();
		console.log(this.getVlSubtotal())
	}

	limpaCarrinho() {
		carrinho.itens = [];
		carrinho.subtotal = 0;
		carrinho.total = 0;
		carrinho.taxaEntrega = 0;
	}
}

export const carrinho = new Carrinho();

