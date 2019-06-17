import { Mensagem } from './../models/mensagem.model';
import { HttpService } from './http.service';
import { Configs } from './../configs';
import { Injectable } from '@angular/core';
import { Service } from '../base/Service';
import { Http } from '../models/http.model';
import { Cliente } from '../models/cliente.model';

@Injectable({
	providedIn: 'root'
})
export class ResolucoesService extends Service<Array<Mensagem>> {

	url: string = `${Configs.url}chamados`;

	constructor(
		public http: HttpService) {
		super(`${Configs.url}chamados`, http);
	}

	async getResolucoes(id, token): Promise<Http> {
		return this.http.get(`${ this.url }/${ id }/resolucoes`, token);
	}

	async postMensagem(id: string, conteudo: string, token): Promise<Http> {
		return this.http.post(`${ this.url }/${ id }/mensagem`, { conteudo: conteudo }, token);
	}
}
