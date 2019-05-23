import { Action } from '@ngrx/store';

export const EDIT_CLIENT_ID		= '[Login] Edit client_id';
export const EDIT_CLIENT_SECRET	= '[Login] Edit client_secret';
export const EDIT_GRANT_TYPE	= '[Login] Edit client_secret';
export const EDIT_ACCESS_TOKEN	= '[Login] Edit access_token';
export const EDIT_TOKEN_TYPE	= '[Login] Edit token_type';


export class EditClientId implements Action {
	readonly type = EDIT_CLIENT_ID;
	constructor(public payload: number) { }
}

export class EditClientSecret implements Action {
	readonly type = EDIT_CLIENT_SECRET;
	constructor(public payload: string) { }
}

export class EditGrantType implements Action {
	readonly type = EDIT_GRANT_TYPE;
	constructor(public payload: string) { }
}

export class EditAccessToken implements Action {
	readonly type = EDIT_ACCESS_TOKEN;
	constructor(public payload: string) { }
}

export class EditTokenType implements Action {
	readonly type = EDIT_TOKEN_TYPE;
	constructor(public payload: string) { }
}

export type All
	= EditClientId
	| EditClientSecret
	| EditGrantType
	| EditAccessToken
	| EditTokenType;