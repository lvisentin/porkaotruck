import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getProdutos(filter = null, fields = null): Observable<any> {
    const route = `${this.apiUrl}/produto/search`;
    const params = {
      filter: {},
      fields: fields,
      paginate: 5,
      page: 1
    }
    return this.httpClient.post(route, params);
  }

  getProduto(productId) {
    const route = `${this.apiUrl}/produto/${productId}`;
    return this.httpClient.get(route);
  }
}
