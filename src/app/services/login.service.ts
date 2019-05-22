import { Http } from './../models/http';
import { HttpService } from './http.service';
import { Configs } from './../configs';
import { Login } from './../models/login';
import { Injectable } from '@angular/core';
import { Service } from '../base/Service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends Service<Login>{

	url: string = `${Configs.url}oauth`;

	constructor(
	  public http: HttpService) {
	  super(`${Configs.url}oauth`, http);
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
  
	static isLogin(): boolean {
	  return (localStorage.getItem(Configs.storageKeys.access_token) != undefined && localStorage.getItem(Configs.storageKeys.access_token) != "");
	}
  
}