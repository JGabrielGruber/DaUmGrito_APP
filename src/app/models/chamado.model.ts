import { ClienteLight } from './clienteL.model';

export class Chamado {
	_id			: string;
	cliente		: ClienteLight;
	responsavel	: null;
	titulo		: string;
	descricao	: string;
	localizacao	: string;
	foto		: string;
	resolucoes	: [];
	timestamp	: string;
	timeupdate	: string;
}