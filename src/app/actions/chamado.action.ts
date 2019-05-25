import { Chamado } from './../models/chamado.model';
import { ChamadoReducer } from './../models/chamadoR.model';
import { ChamadoService } from './../services/chamado.service';
import { Action } from '@ngrx/store';

export const REQUEST_CHAMADO		= '[Chamado] Request Chamado';
export const RECEIVE_CHAMADO		= '[Chamado] Receive Chamado';
export const UNSET_CHAMADO			= '[Chamado] Unset Chamado';

export class RequestChamado implements Action {
	readonly type = REQUEST_CHAMADO;
}

export class ReceiveChamado implements Action {
	readonly type = RECEIVE_CHAMADO;
	constructor(public payload: ChamadoReducer) {}
}

export class UnsetChamado implements Action {
	readonly type = UNSET_CHAMADO;
}

export async function fetchChamadosIfNeeded(chamadoService: ChamadoService, store: any) {
	let isFetching: boolean;
	await store.select('chamado').subscribe((data)=> {
		isFetching = data.isFetching;
	});
	if (isFetching) {
		return await chamadoService.get();
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
	| UnsetChamado