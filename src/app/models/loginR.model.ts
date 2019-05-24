import { Login } from './login.model';

export class LoginR implements LoginR {
	isFetching		: boolean;
	didInvalidate	: boolean;
	data			: Login;
}