import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private apiUrl = environment.apiUrl;
	private user = JSON.parse(localStorage.getItem('user'));

	constructor(
		private httpClient: HttpClient
	) { }

	findAndCreateUserEndereco(endereco) {
		const route = `${this.apiUrl}/user/${this.user.id}/enderecos`;
		return this.httpClient.post(route, endereco);
	}

	getEnderecosByUsuario() {
        const route = `${this.apiUrl}/user/${this.user.id}/enderecos`;
        return this.httpClient.get(route);
	}

	deleteUsuarioEndereco(id) {
		const route = `${this.apiUrl}/user/${this.user.id}/enderecos`;
		return this.httpClient.delete(route);
	}

	register(user) {
		console.log(user)
		const route = `${this.apiUrl}/register`;
		return this.httpClient.post(route, user);
	}

}
