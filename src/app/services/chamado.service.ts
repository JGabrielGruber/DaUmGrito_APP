import { Chamado } from './../models/chamado.model';
import { HttpService } from './http.service';
import { Configs } from './../configs';
import { Injectable } from '@angular/core';
import { Service } from '../base/Service';
import { Http } from '../models/http.model';
import { Cliente } from '../models/cliente.model';

@Injectable({
	providedIn: 'root'
})
export class ChamadoService extends Service<Chamado> {

	url: string = `${Configs.url}chamados`;

	constructor(
		public http: HttpService) {
		super(`${Configs.url}chamados`, http);
	}

	async getByCliente(cliente: Cliente, token): Promise<Http> {
		return this.http.get(`${ this.url }/cliente/${ cliente.cpf }`, token);
	}

	setChamados(chamado: Chamado) {
		sessionStorage.setItem(Configs.storageKeys.chamados, JSON.stringify(chamado));
	}

	unsetChamados() {
		sessionStorage.setItem(Configs.storageKeys.chamados, "");
	}

	getChamados(): Array<Chamado> {
		return JSON.parse(sessionStorage.getItem(Configs.storageKeys.chamados));
	}
}
