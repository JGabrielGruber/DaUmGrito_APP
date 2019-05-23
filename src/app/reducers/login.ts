import * as LoginActions from '../actions/login';
import { Login } from '../models/login'

export type Action = LoginActions.All;

const defaultState: Login = {
	client_id: null,
	client_secret: null,
	grant_type: 'client_credentials',
	access_token: null,
	token_type: null
}

const newState = (state, newData) => {
	return Object.assign({}, state, newData)
}

export function loginReducers(state: Login = defaultState, action: Action) {

	switch (action.type) {
		case LoginActions.EDIT_CLIENT_ID:
			return newState(state, { client_id: action.payload });
		case LoginActions.EDIT_CLIENT_SECRET:
			return newState(state, { client_secret: action.payload });
		case LoginActions.EDIT_GRANT_TYPE:
			return newState(state, { grant_type: action.payload });
		case LoginActions.EDIT_ACCESS_TOKEN:
			return newState(state, { access_token: action.payload });
		case LoginActions.EDIT_TOKEN_TYPE:
			return newState(state, { token_type: action.payload });

		default:
			return state;

	}
}