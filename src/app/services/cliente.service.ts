import { HttpService } from './http.service';
import { Configs } from './../configs';
import { Injectable } from '@angular/core';
import { Service } from '../base/Service';
import { Cliente } from '../models/cliente.model';

@Injectable({
	providedIn: 'root'
})
export class ClienteService extends Service<Cliente>{

	url: string = `${Configs.url}clientes`;

	constructor(
		public http: HttpService) {
		super(`${Configs.url}clientes`, http);
	}
}
