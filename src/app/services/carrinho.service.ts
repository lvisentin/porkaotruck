import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  createPedido(pedido) {
    let route = `${this.apiUrl}/pedido`;
    return this.httpClient.post(route, pedido);
  }

  getMetodosPagamento() {
    let route = `${this.apiUrl}/forma-pagamento`;
    return this.httpClient.get(route);
  }

  teste() {
    return console.log('teste')
  }
}
