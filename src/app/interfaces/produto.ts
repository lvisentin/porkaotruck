export interface Produto {
	id: number;
	idcategoria: number;
	nome: string;
	descricao: string;
	valor: number;
	url_image: string;
	qtd?: number;
	preco: any;
	adicionais?: Array<Produto>;
	vltotal?: number;
}
