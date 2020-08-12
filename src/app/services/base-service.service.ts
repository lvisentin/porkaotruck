import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    private apiUrl = environment.apiUrl;

    constructor(
        private httpClient: HttpClient
    ) { }

}
