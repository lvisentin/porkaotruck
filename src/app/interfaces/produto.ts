import { Ingrediente } from './ingrediente';

export interface Produto {
    id: number;
    idcategoria: number;
    nome: string;
    descricao: string;
    valor: number;
    url_image: string;
    qtd?: number;
    preco: number;
    adicionais?: Array<Produto>;
}
