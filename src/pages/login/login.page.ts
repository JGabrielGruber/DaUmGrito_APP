import { LoginR } from './../../app/models/loginR.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Login } from './../../app/models/login.model';
import { LoginService } from '../../app/services/login.service';
import * as LoginActions from '../../app/actions/login.action';
import { Router } from '@angular/router';

interface AppState {
	login: LoginR
}

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	credentials = { client_id: null, client_secret: null };
	login$: Observable<LoginR>;

	constructor(
		public router: Router,
		private loginService: LoginService,
		private store: Store<AppState>
	) {
		this.login$ = this.store.select('login');
	}

	ngOnInit() {}

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
			this.router.navigateByUrl('/home');
		}
	}

	signUp() {
		this.router.navigateByUrl('/signup');
	}

}