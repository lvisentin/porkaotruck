export interface User {
	id: number;
	nome: string;
	email: string;
	cpf?: string;
	token?: string;
}

export interface UserEndereco {
	id: number;
	idusuario: number;
	idendereco: number;
	endereco: Endereco;
}

export interface Endereco {
	id: number;
	rua: string;
	numero: number;
	bairro: string;
	cep: string;
	complemento?: string;
	cidade:string;
	uf:string;
	pais:string;
}