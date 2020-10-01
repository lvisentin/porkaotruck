import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private authenticationService: AuthenticationService
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const currentUser = this.authenticationService.currentUserValue;
		const token = this.authenticationService.getToken;
		if (currentUser && token) {
			// Usuário logado
			return true;
		}

		// Usuário não logado, manda pra tela de login
		// Exemplo de como mandar query param pra assim que ele logar, voltar pra rota que ele tentou acessar:
		// this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
		// this.router.navigate(['/login']);
		return false;
	}
}
