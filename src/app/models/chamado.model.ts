import { Cliente } from './cliente.model';

export class Chamado {
	_id			: string;
	cliente		: Cliente;
	responsavel	: null;
	titulo		: string;
	descricao	: string;
	localizacao	: string;
	foto		: string;
	resolucoes	: [];
	timestamp	: string;
	timeupdate	: string;
}