import { Http } from '../models/http.model';
import { HttpService } from './http.service';
import { Configs } from './../configs';
import { Login } from '../models/login.model';
import { Injectable } from '@angular/core';
import { Service } from '../base/Service';

@Injectable({
	providedIn: 'root'
})
export class LoginService extends Service<Login>{

	url: string = `${Configs.url}oauth`;

	constructor(
		public http: HttpService
	) {
		super(`${Configs.url}oauth`, http, "Sucesso!");
	}

	async auth(login: Login): Promise<Http> {
		return this.http.post(`${this.url}/token`, login);
	}

	setLogin(result: any) {
		localStorage.setItem(Configs.storageKeys.access_token, result.access_token);
		localStorage.setItem(Configs.storageKeys.token_type, result.token_type.charAt(0).toUpperCase() + result.token_type.slice(1));
	}

	unsetLogin() {
		localStorage.setItem(Configs.storageKeys.access_token, "");
		localStorage.setItem(Configs.storageKeys.token_type, "");
	}

	async getToken() {
		let token = await localStorage.getItem(Configs.storageKeys.access_token);
		if (token != null && token != "") {
			return await localStorage.getItem(Configs.storageKeys.token_type) + ' ' + token;
		} else {
			return null;
		}

	}

	static isLogin(): boolean {
		return (localStorage.getItem(Configs.storageKeys.access_token) != undefined && localStorage.getItem(Configs.storageKeys.access_token) != "");
	}

}