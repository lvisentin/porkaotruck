import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  createPedido(pedido) {
    let route = `${this.apiUrl}/pedido`;
    return this.httpClient.post(route, pedido);
  }

  getByUsuario(idUsuario: number) {
    let route = `${this.apiUrl}/user/${idUsuario}/pedidos/`;
    return this.httpClient.get(route);
  }

  getPedido(idPedido: number) {
    let route = `${this.apiUrl}/pedido/${idPedido}`;
    return this.httpClient.get(route);
  }
}
