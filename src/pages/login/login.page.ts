import { UsuarioService } from './../../app/services/usuario.service';
import { ClienteReducer } from './../../app/models/clienteR.model';
import { LoginReducer } from './../../app/models/loginR.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { Login } from './../../app/models/login.model';
import { LoginService } from '../../app/services/login.service';
import * as LoginActions from '../../app/actions/login.action';
import * as ClienteActions from '../../app/actions/cliente.action';

interface AppState {
	login: LoginReducer,
	usuario: ClienteReducer
}

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage {
	credentials = { client_id: null, client_secret: null };
	login$: Observable<LoginReducer>;
	usuario$: Observable<ClienteReducer>;

	constructor(
		public router: Router,
		private loginService: LoginService,
		private usuarioService: UsuarioService,
		private store: Store<AppState>
	) {
		this.login$ = this.store.select('login');
		this.usuario$ = this.store.select('cliente');
		this.check();
	}

	async check() {
		if ((await this.loginService.getToken())) {
			this.router.navigateByUrl('/home/main');
		}
	}

	async logIn(): Promise<void> {
		let login:Login = {
			client_id: this.credentials.client_id,
			client_secret: this.credentials.client_secret,
			grant_type: "client_credentials",
			access_token: null,
			token_type: null
		}
		let result = await LoginActions.logIn(login, this.loginService, this.store);
		if (result && result.success) {
			this.login$.subscribe((data) => {
				this.loginService.setLogin(data.data);
			});
			await ClienteActions.fetchUsuario(this.loginService, this.usuarioService, this.store);
			this.router.navigateByUrl('/home', { replaceUrl: true });
		}
	}

	signUp() {
		this.router.navigateByUrl('/signup');
	}

}