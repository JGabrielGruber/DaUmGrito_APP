import { ChamadoReducer } from './../models/chamadoR.model';
import * as ChamadoActions from '../actions/chamado.action';

export type Action = ChamadoActions.All;

const defaultState: ChamadoReducer = {
	isFetching		: false,
	didInvalidate	: false,
	data			: [
		{
			_id			: null,
			cliente		: {
				_id: null,
				contato: {
					email_um: null
				},
				cpf: null,
				nome: null
			},
			titulo		: null,
			descricao	: null,
			localizacao	: null,
			timestamp	: null,
			timeupdate	: null
		}
	]
}

const newState = (state, newData) => {
	return Object.assign({}, state, newData);
}

export function chamadoRedcuers(state: ChamadoReducer = defaultState, action: Action) {

	switch (action.type) {
		case ChamadoActions.REQUEST_CHAMADO:
			return newState(state, { isFetching: true, didInvalidate: false });
		case ChamadoActions.RECEIVE_CHAMADO:
			return newState(state, action.payload);
		case ChamadoActions.RECEIVE_FETCH:
			return newState(state, { isFetching: false, didInvalidate: true });
		case ChamadoActions.SET_CHAMADO:
			return newState(state, { data: action.payload });
		case ChamadoActions.UNSET_CHAMADO:
			return newState(state, defaultState);
		default:
			return state;

	}
}