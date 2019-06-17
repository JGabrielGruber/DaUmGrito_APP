import { ReducerModel } from '../base/Reducer.model';
import { Mensagem } from './mensagem.model';

export class ResolucoesReducer extends ReducerModel {
	data : Array<Mensagem>;
}