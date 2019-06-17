export class Mensagem {
	_id:		string;
	autor:		string;
	remetente:	string;
	level:		string;
	conteudo:	string;
	pendente?:	boolean=false;
	timestamp:	string;
}