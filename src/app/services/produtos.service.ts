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

  getProdutos(): Observable<any> {
    const route = `${this.apiUrl}/produto/search`;
    const params = {
      filter: {},
      fields: { preco: ["preco"] },
      paginate: 5,
      page: 1
    }
    return this.httpClient.post(route, params);
  }
}
