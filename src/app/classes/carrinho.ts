import { Produto } from '../interfaces/produto';

export class Carrinho {
    private itens: Produto[] = [];
    private subtotal: number = 0;
    private total: number = 0;
    private taxaEntrega: number = 0;

    constructor() {
    }

    adicionarItem(item: Produto) {
        this.itens.push(item);
        this.subtotal += item.preco[0].preco;
        console.log(item)
    }

    removerItem(item: Produto) {
        const carrinhoItem = this.itens.find(carrinhoItem => carrinhoItem == item);
        console.log('carrinhoItem', carrinhoItem);
    }

}


