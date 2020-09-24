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

  getTaxaEntrega(objEndereco) {
    let route = `${this.apiUrl}/endereco/distancia`;
    return this.httpClient.post(route, objEndereco);
  }

  getDistanciaGoogleMaps(origin, destination) {
    let route = `https://maps.googleapis.com/maps/api/distancematrix/json?
                origins=${origin}&
                destinations=${destination}&
                key=${environment.apiKey}`;

    return this.httpClient.get(route);
  }

  findAndCreateUserEndereco(endereco) {
    let route = `${this.apiUrl}/user/${this.user.id}/enderecos`;

    return this.httpClient.post(route, endereco);

  }

  searchViaCep(endereco) {
    let route = `https://viacep.com.br/ws${endereco}`;
    // SP/Sorocaba/Carlos%20Smith/json/
    return this.httpClient.get(route);
  }

}
