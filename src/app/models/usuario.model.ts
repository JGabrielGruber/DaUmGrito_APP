export class Usuario {
	_id: string;
	contato: {
		telefone_um: string,
		email_um: string
	} = {
		telefone_um: null,
		email_um: null
	};
	cpf: number;
	endereco: {
		estado: string,
		cidade: string,
		CEP: number,
		bairro: string,
		rua: string,
		numnero: number
	} = {
		estado: null,
		cidade: null,
		CEP: null,
		bairro: null,
		rua: null,
		numnero: null
	};
	nome: string;
	notificacoes: [];
	timestamp: string;
	timeupdate: string;
	
}
