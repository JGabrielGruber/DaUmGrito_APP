import { UsuarioService } from './../services/usuario.service';
import { ClienteReducer } from './../models/clienteR.model';
import { Cliente } from './../models/cliente.model';
import { ClienteService } from './../services/cliente.service';
import { Action } from '@ngrx/store';
import { LoginService } from '../services/login.service';

export const REQUEST_CLIENTE		= '[Cliente] Request cliente';
export const RECEIVE_CLIENTE		= '[Cliente] Receive cliente';
export const RECEIVE_FETCH			= '[Cliente] Receive Fetch cliente';
export const SET_CLIENTE			= '[Cliente] Set cliente';
export const UNSET_CLIENTE			= '[Cliente] Unset cliente';

export class RequestCliente implements Action {
	readonly type = REQUEST_CLIENTE;
}

export class ReceiveCliente implements Action {
	readonly type = RECEIVE_CLIENTE;
	constructor(public payload: ClienteReducer) {}
}

export class ReceiveFetch implements Action {
	readonly type = RECEIVE_FETCH;
}

export class SetCliente implements Action {
	readonly type = SET_CLIENTE;
	constructor(public payload: Cliente) {}
}

export class UnsetCliente implements Action {
	readonly type = UNSET_CLIENTE;
}

export async function fetchUsuario(loginService: LoginService, usuarioService: UsuarioService, store: any) {
	let isFetching: boolean;
	await store.select('cliente').subscribe((data)=> {
		isFetching = data.isFetching;
	});
	if (!isFetching) {
		let localUser	= await usuarioService.getUsuario();
		if (localUser) {
			store.dispatch(new SetCliente(localUser))
		}
		store.dispatch(new RequestCliente());
		let token	= await loginService.getToken();
		if (token) {
			let response	= await usuarioService.getData(token);
			if (response.success) {
				usuarioService.setUsuario(response.data);
				store.dispatch(new ReceiveFetch);
				return response.data;
			}
		}
		store.dispatch(new ReceiveFetch);
		return;
	}
}

export async function putCliente(clienteService: ClienteService, store: any, cliente: Cliente) {
	let isFetching: boolean;
	await store.select('cliente').subscribe((data)=> {
		isFetching = data.isFetching;
	});
	if (!isFetching) {
		return await clienteService.put(cliente._id, cliente);
	}
}

export async function postCliente(clienteService: ClienteService, store: any, cliente: Cliente) {
	let isFetching: boolean;
	await store.select('cliente').subscribe((data)=> {
		isFetching = data.isFetching;
	});
	if (!isFetching) {
		store.dispatch(new RequestCliente());
		let result = await clienteService.post(cliente);
		if (result.success) {
			store.dispatch(new ReceiveCliente({ isFetching: false, didInvalidate: false, data: cliente }));
		} else {
			store.dispatch(new ReceiveCliente({ isFetching: false, didInvalidate: true, data: new Cliente() }));
		}
		return result;
	}
}

export async function deleteCliente(clienteService: ClienteService, store: any, cliente: Cliente) {
	let isFetching: boolean;
	await store.select('cliente').subscribe((data)=> {
		isFetching = data.isFetching;
	});
	if (!isFetching) {
		return await clienteService.delete(cliente._id);
	}
}


export type All
	= RequestCliente
	| ReceiveCliente
	| ReceiveFetch
	| SetCliente
	| UnsetCliente