import { ClienteLight } from './clienteL.model';

export class ChamadoLight {
	_id			: string;
	cliente		: ClienteLight;
	titulo		: string;
	descricao	: string;
	localizacao	: {
		latitude	: number;
		longitude	: number;
	};
	timestamp	: string;
	timeupdate	: string;
}