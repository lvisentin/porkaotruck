import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {
	constructor(private authenticationService: AuthenticationService, private router: Router) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(catchError(err => {
			if (err.status === 401) {
				console.error('O USUÁRIO PRECISA ESTAR LOGADO PRA ACESSAR ESSA MERDA');
				console.log(err);
				localStorage.removeItem('user');
				this.router.navigate(['/login']);
				// Avaliar se compensa deslogar o cara aqui
			}

			const error = err.error;
			return throwError(error);
		}));
	}
}
