import { Ingrediente } from './ingrediente';

export interface Lanche {
    id: number;
    nome: string;
    descricao: string;
    valor: number;
    ingredientes: Ingrediente[];
    imagem: string;
}
