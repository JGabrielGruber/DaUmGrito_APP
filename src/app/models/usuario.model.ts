export class Usuario {
	_id: string;
	contato: {
		telefone_um: string, email_um: string
	};
	cpf: number;
	endereco: {
		estado: string,
		cidade: string,
		CEP: number,
		bairro: string,
		rua: string,
		numnero: number
	};
	nome: string;
	notificacoes: [];
	timestamp: string;
	timeupdate: string;
	
}
