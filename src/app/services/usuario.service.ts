import { Http } from '../models/http.model';
import { HttpService } from './http.service';
import { Configs } from './../configs';
import { Injectable } from '@angular/core';
import { Service } from '../base/Service';
import { Cliente } from '../models/cliente.model';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService extends Service<Cliente>{

	url: string = `${Configs.url}oauth`;

	constructor(
		public http: HttpService) {
		super(`${Configs.url}oauth`, http);
	}

	async getData(token): Promise<Http> {
		return this.http.get(`${this.url}/token`, token);
	}

	setUsuario(usuario: Cliente) {
		sessionStorage.setItem(Configs.storageKeys.usuario, JSON.stringify(usuario));
	}

	unsetUsuario() {
		sessionStorage.setItem(Configs.storageKeys.usuario, "");
	}

	getUsuario(): Cliente {
		return JSON.parse(sessionStorage.getItem(Configs.storageKeys.usuario));
	}

}