import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getCategorias(filter = null, fields = null) {
    const route = `${this.apiUrl}/categoria/search`;
    const params = {
      filter: filter,
      fields: fields,
      paginate: 10,
      page: 1
    }
    return this.httpClient.post(route, params);
  }

}
