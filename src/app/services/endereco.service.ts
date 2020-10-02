import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class EnderecoService {

	private apiUrl = environment.apiUrl;
	private user = JSON.parse(localStorage.getItem('user'));

	constructor(
		private httpClient: HttpClient
	) { }

	getTaxaEntrega(objEndereco): any {
		const route = `${this.apiUrl}/endereco/distancia`;
		return this.httpClient.post(route, objEndereco);
	}

	getDistanciaGoogleMaps(origin, destination) {
		const route = `https://maps.googleapis.com/maps/api/distancematrix/json?
									origins=${origin}&
									destinations=${destination}&
									key=${environment.apiKey}`;

		return this.httpClient.get(route);
	}

	findAndCreateUserEndereco(endereco) {
		const route = `${this.apiUrl}/user/${this.user.id}/enderecos`;

		return this.httpClient.post(route, endereco);
	}

	searchViaCep(endereco) {
		const route = `https://viacep.com.br/ws${endereco}`;
		return this.httpClient.get(route);
	}

}
