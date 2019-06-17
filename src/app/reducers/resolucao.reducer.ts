import * as ResolucoesActions from '../actions/resolucoes.action';
import { ResolucoesReducer } from '../models/resolucoesR.model';

export type Action = ResolucoesActions.All;

const defaultState: ResolucoesReducer = {
	isFetching		: false,
	didInvalidate	: false,
	data			: null
}

const newState = (state, newData) => {
	return Object.assign({}, state, newData);
}

export function resolucaoReducers(state: ResolucoesReducer = defaultState, action: Action) {

	switch (action.type) {
		case ResolucoesActions.RECEIVE_RESOLUCOES:
			return newState(state, action.payload);
		case ResolucoesActions.RECEIVE_FETCH:
			return newState(state, { isFetching: false, didInvalidate: true });
		case ResolucoesActions.SET_RESOLUCOES:
			return newState(state, { data: action.payload });
		case ResolucoesActions.UNSET_RESOLUCOES:
			return newState(state, defaultState);

		default:
			return state;

	}
}