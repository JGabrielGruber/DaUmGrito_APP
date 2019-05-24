import { Http } from '../models/http.model';
import { HttpService } from './http.service';
import { Configs } from './../configs';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Service } from '../base/Service';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService extends Service<Usuario>{

	url: string = `${Configs.url}oauth`;

	constructor(
		public http: HttpService) {
		super(`${Configs.url}oauth`, http);
	}

	async getData(token): Promise<Http> {
		return this.http.get(`${this.url}/token`, token);
	}

}