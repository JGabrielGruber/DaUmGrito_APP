export class Login {
	client_id		: number;
	client_secret	: string;
	grant_type		: string = "client_credentials";
	access_token	: string;
	token_type		: string;
}
