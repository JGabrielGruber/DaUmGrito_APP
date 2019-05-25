import { ClienteReducer } from './../models/clienteR.model';
import { Cliente } from './../models/cliente.model';
import { ClienteService } from './../services/cliente.service';
import { Action } from '@ngrx/store';

export const REQUEST_CLIENTE		= '[Cliente] Request cliente';
export const RECEIVE_CLIENTE		= '[Cliente] Receive cliente';
export const UNSET_CLIENTE			= '[Cliente] Unset cliente';

export class RequestCliente implements Action {
	readonly type = REQUEST_CLIENTE;
}

export class ReceiveCliente implements Action {
	readonly type = RECEIVE_CLIENTE;
	constructor(public payload: ClienteReducer) {}
}

export class UnsetCliente implements Action {
	readonly type = UNSET_CLIENTE;
}

export async function fetchClientesIfNeeded(clienteService: ClienteService, store: any) {
	let isFetching: boolean;
	await store.select('cliente').subscribe((data)=> {
		isFetching = data.isFetching;
	});
	if (!isFetching) {
		store.dispatch(new RequestCliente());
		return await clienteService.get();
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
	| UnsetCliente