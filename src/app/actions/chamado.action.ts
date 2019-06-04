import { ChamadoLight } from './../models/chamadoL.model';
import { LoginService } from './../services/login.service';
import { Chamado } from './../models/chamado.model';
import { ChamadoReducer } from './../models/chamadoR.model';
import { ChamadoService } from './../services/chamado.service';
import { Action } from '@ngrx/store';

export const REQUEST_CHAMADO		= '[Chamado] Request Chamado';
export const RECEIVE_CHAMADO		= '[Chamado] Receive Chamado';
export const RECEIVE_FETCH			= '[Chamado] Receive Fetch Chamado';
export const SET_CHAMADO			= '[Chamado] Set Chamado';
export const UNSET_CHAMADO			= '[Chamado] Unset Chamado';

export class RequestChamado implements Action {
	readonly type = REQUEST_CHAMADO;
}

export class ReceiveChamado implements Action {
	readonly type = RECEIVE_CHAMADO;
	constructor(public payload: ChamadoReducer) {}
}

export class ReceiveFetch implements Action {
	readonly type = RECEIVE_FETCH;
}

export class SetChamado implements Action {
	readonly type = SET_CHAMADO;
	constructor(public payload: Array<ChamadoLight>) {}
}

export class UnsetChamado implements Action {
	readonly type = UNSET_CHAMADO;
}

export async function fetchChamados(chamadoService: ChamadoService, loginService: LoginService, store: any) {
	let isFetching:	boolean;
	await store.select('chamados').subscribe((data) => {
		isFetching	= data.isFetching;
	});
	if (!isFetching) {
		let localChamados	= await chamadoService.getChamados();
		if (localChamados) {
			store.dispatch(new SetChamado(localChamados));
		}
		store.dispatch(new RequestChamado());
		let token	= await loginService.getToken();
		if (token) {
			return await store.select('cliente').subscribe(async (data) => {
				if (data.data.cpf) {
					let response	= await chamadoService.getByCliente(data.data, token);
					if (response.success) {
						chamadoService.setChamados(response.data);
						store.dispatch(new ReceiveFetch);
						return response.data;
					}
					store.dispatch(new ReceiveFetch);
					return;
				}
			});
		}
		return;
	}
}

export async function putChamado(chamadoService: ChamadoService, store: any, chamado: Chamado) {
	let isFetching: boolean;
	await store.select('chamado').subscribe((data)=> {
		isFetching = data.isFetching;
	});
	if (isFetching) {
		return await chamadoService.put(chamado._id, chamado);
	}
}

export async function postChamado(chamadoService: ChamadoService, store: any, chamado: Chamado) {
	let isFetching: boolean;
	await store.select('chamado').subscribe((data)=> {
		isFetching = data.isFetching;
	});
	if (isFetching) {
		return await chamadoService.post(chamado);
	}
}

export async function deleteChamado(chamadoService: ChamadoService, store: any, chamado: Chamado) {
	let isFetching: boolean;
	await store.select('chamado').subscribe((data)=> {
		isFetching = data.isFetching;
	});
	if (isFetching) {
		return await chamadoService.delete(chamado._id);
	}
}


export type All
	= RequestChamado
	| ReceiveChamado
	| ReceiveFetch
	| SetChamado
	| UnsetChamado