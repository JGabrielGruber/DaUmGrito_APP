import { Chamado } from './../models/chamado.model';
import { HttpService } from './http.service';
import { Configs } from './../configs';
import { Injectable } from '@angular/core';
import { Service } from '../base/Service';

@Injectable({
	providedIn: 'root'
})
export class ChamadoService extends Service<Chamado> {

	url: string = `${Configs.url}chamados`;

	constructor(
		public http: HttpService) {
		super(`${Configs.url}chamados`, http);
	}
}
