import { LoginR } from './../models/loginR.model';
import * as LoginActions from '../actions/login.action';

export type Action = LoginActions.All;

const defaultState: LoginR = {
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

export function loginReducers(state: LoginR = defaultState, action: Action) {

	switch (action.type) {
		case LoginActions.REQUEST_LOGIN:
			return newState(state, { isFetching: true, didInvalidate: false });
		case LoginActions.RECEIVE_LOGIN:
			return newState(state, { isFetching: false, didInvalidate: false, data: action.payload });
		case LoginActions.UNSET_LOGIN:
			return newState(state, defaultState);
		case LoginActions.EDIT_CLIENT_ID:
			return defaultState;
		case LoginActions.EDIT_CLIENT_SECRET:
			return newState(state, { data: { client_secret: action.payload } });
		case LoginActions.EDIT_GRANT_TYPE:
			return newState(state, { data: { grant_type: action.payload } });
		case LoginActions.EDIT_ACCESS_TOKEN:
			return newState(state, { data: { access_token: action.payload } });
		case LoginActions.EDIT_TOKEN_TYPE:
			return newState(state, { data: { token_type: action.payload } });

		default:
			return state;

	}
}