import { LoginService } from './../services/login.service';
import { Login } from './../models/login.model';
import { Action } from '@ngrx/store';

export const REQUEST_LOGIN		= '[Login] Request login';
export const RECEIVE_LOGIN		= '[Login] Receive login';
export const UNSET_LOGIN		= '[Login] Unset login';

export const EDIT_CLIENT_ID		= '[Login] Edit client_id';
export const EDIT_CLIENT_SECRET	= '[Login] Edit client_secret';
export const EDIT_GRANT_TYPE	= '[Login] Edit client_secret';
export const EDIT_ACCESS_TOKEN	= '[Login] Edit access_token';
export const EDIT_TOKEN_TYPE	= '[Login] Edit token_type';

export class RequestLogin implements Action {
	readonly type = REQUEST_LOGIN;
}

export class ReceiveLogin implements Action {
	readonly type = RECEIVE_LOGIN;
	constructor(public payload: Login) {}
}

export class UnsetLogin implements Action {
	readonly type = UNSET_LOGIN;
}

export async function logIn(login: Login, loginService: LoginService, store: any) {
	let isFetching: boolean;
	await store.select('login').subscribe( async (state) => {
		isFetching = state.isFetching;
	});
	if (!isFetching) {
		store.dispatch(new RequestLogin());
		return await loginService.auth(login).then((response) => {
			if (response.success) {
				login.access_token	= response.data.access_token;
				login.token_type	= response.data.token_type;
			}
			store.dispatch(new ReceiveLogin(login));
			return response;
		});
	}
}

export type All
	= RequestLogin
	| ReceiveLogin
	| UnsetLogin