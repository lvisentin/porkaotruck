import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authenticationService: AuthenticationService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const currentUser = JSON.parse(localStorage.getItem('user'));
		const token = JSON.parse(localStorage.getItem('token'));

		const isLoggedIn = currentUser && token;
		const isApiUrl = request.url.startsWith(environment.apiUrl);
		if (isLoggedIn && isApiUrl) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`
				}
			});
		}

		return next.handle(request);
	}
}
