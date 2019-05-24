import { ClienteR } from './../models/clienteR.model';
import * as ClienteActions from '../actions/cliente.action';

export type Action = ClienteActions.All;

const defaultState: ClienteR = {
	isFetching		: false,
	didInvalidate	: false,
	data			: {
		_id: null,
		contato: {
			telefone_um: null,
			email_um: null
		},
		cpf: null,
		endereco: {
			estado: null,
			cidade: null,
			CEP: null,
			bairro: null,
			rua: null,
			numnero: null
		},
		nome: null,
		notificacoes: [],
		timestamp: null,
		timeupdate: null
	}
}

const newState = (state, newData) => {
	return Object.assign({}, state, newData);
}

export function clienteReducers(state: ClienteR = defaultState, action: Action) {

	switch (action.type) {
		case ClienteActions.REQUEST_CLIENTE:
			return newState(state, { isFetching: true, didInvalidate: false });
		case ClienteActions.RECEIVE_CLIENTE:
			return newState(state, { isFetching: false, didInvalidate: false, data: action.payload });
		case ClienteActions.UNSET_CLIENTE:
			return newState(state, defaultState);

		default:
			return state;

	}
}