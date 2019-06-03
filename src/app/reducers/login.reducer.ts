import { LoginReducer } from './../models/loginR.model';
import * as LoginActions from '../actions/login.action';

export type Action = LoginActions.All;

const defaultState: LoginReducer = {
	isFetching		: false,
	didInvalidate	: false,
	data			: {
		client_id: null,
		client_secret: null,
		grant_type: 'client_credentials',
		access_token: null,
		token_type: null
	}
}

const newState = (state, newData) => {
	return Object.assign({}, state, newData);
}

export function loginReducers(state: LoginReducer = defaultState, action: Action) {

	switch (action.type) {
		case LoginActions.REQUEST_LOGIN:
			return newState(state, { isFetching: true, didInvalidate: false });
		case LoginActions.RECEIVE_LOGIN:
			return newState(state, { isFetching: false, didInvalidate: false, data: action.payload });
		case LoginActions.UNSET_LOGIN:
			return newState(state, defaultState);

		default:
			return state;

	}
}