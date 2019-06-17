import { LoginService } from './../services/login.service';
import { Mensagem } from './../models/mensagem.model';
import { ResolucoesReducer } from './../models/resolucoesR.model';
import { ResolucoesService } from './../services/resolucoes.service';
import { Action } from '@ngrx/store';

export const REQUEST_RESOLUCOES		= '[Resolucoes] Request Resolucoes';
export const RECEIVE_RESOLUCOES		= '[Resolucoes] Receive Resolucoes';
export const RECEIVE_FETCH			= '[Resolucoes] Receive Fetch Resolucoes';
export const SET_RESOLUCOES			= '[Resolucoes] Set Resolucoes';
export const UNSET_RESOLUCOES		= '[Resolucoes] Unset Resolucoes';

export class RequestResolucoes implements Action {
	readonly type = REQUEST_RESOLUCOES;
}

export class ReceiveResolucoes implements Action {
	readonly type = RECEIVE_RESOLUCOES;
	constructor(public payload: ResolucoesReducer) {}
}

export class ReceiveFetch implements Action {
	readonly type = RECEIVE_FETCH;
}

export class SetResolucoes implements Action {
	readonly type = SET_RESOLUCOES;
	constructor(public payload: Array<Mensagem>) {}
}

export class UnsetResolucoes implements Action {
	readonly type = UNSET_RESOLUCOES;
}

export async function fetchResolucoes(resolucoesService: ResolucoesService,
	loginService: LoginService, store: any, id: string) {
	let isFetching:	boolean;
	await store.select('resolucoes').subscribe((data) => {
		isFetching	= data.isFetching;
	});
	if (!isFetching) {
		store.dispatch(new RequestResolucoes());
		let token	= await loginService.getToken();
		if (token) {
			let response	= await resolucoesService.getResolucoes(id, token);
			if (response.success) {
				store.dispatch(new ReceiveResolucoes(
					{ isFetching: false, didInvalidate: false, data: response.data }
				));
				return response.data;
			} else {
				store.dispatch(new ReceiveFetch);
				return;
			}
		}
		return;
	}
}

export async function postMensagem(resolucoesService: ResolucoesService, loginService: LoginService,
	store: any, id: string, conteudo: string) {
	let token	= await loginService.getToken();
	if (token) {
		store.dispatch(new RequestResolucoes);
		let resolucoes;
		await store.select('resolucoes').subscribe((data) => {
			resolucoes	= data.data;
		});
		resolucoes.resolucoes.push({ level: "cliente", conteudo: conteudo, pendente: true });
		store.dispatch(new SetResolucoes(resolucoes));
		let response	= await resolucoesService.postMensagem(id, conteudo, token);
		if (response.success) {
			store.dispatch(new ReceiveResolucoes(
				{ isFetching: false, didInvalidate: false, data: response.data }));
			return response.data;
		} else {
			store.dispatch(new ReceiveFetch);
			return;
		}
	}
}

export type All
	= RequestResolucoes
	| ReceiveResolucoes
	| ReceiveFetch
	| SetResolucoes
	| UnsetResolucoes