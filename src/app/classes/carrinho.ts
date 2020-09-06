import { Produto } from '../interfaces/produto';

class Carrinho {
    private itens: Produto[] = [];
    private subtotal: number = 0;
    private total: number = 0;
    private taxaEntrega: number = 0;

    constructor() {
    }

    returnItensApi() {
        const itensApi = this.itens.map((item: Produto) => {
            const itemFormatado = {
                idproduto: item.id,
                quantidade: item.qtd,
                vlsubtotal: item.preco[0].preco,
                vladicionais: 0,
                vltotal: item.preco[0].preco,
                adicionais: []
            }

            if (item.adicionais) {
                itemFormatado.adicionais = item.adicionais.map((adicional: Produto) => {
                    const adicionalFormatado = {
                        idadicional: adicional.id,
                        quantidade: adicional.qtd,
                        vltotal: adicional.valor
                    };
                });

                itemFormatado.vladicionais = item.adicionais.reduce((acc, adicional: Produto) => acc + adicional.valor, 0);

            } else { delete itemFormatado.adicionais }

            return itemFormatado;
        })

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
        if (item.adicionais) {
            const teste = item.adicionais.reduce((total, adicional) => {
                return total + adicional.preco[0].preco;
            }, 0);
            console.log('teste preco', teste)
        }
        if (this.itens.length >= 1) {
            this.itens.forEach((value, index) => {
                if (value.id == item.id) {
                    value.qtd += item.qtd;
                } else {
                    this.itens.push(item);
                }
            })
        } else {
            this.itens.push(item);
        }

        this.subtotal += item.preco[0].preco;
        this.calculaTotal();
    }

    calculaTotal() {
        this.total = this.subtotal + this.taxaEntrega;
    }

    removerItem(item: Produto) {
        const carrinhoItem = this.itens.find(carrinhoItem => carrinhoItem == item);
        console.log('carrinhoItem', carrinhoItem);
    }

}

export const carrinho = new Carrinho();

