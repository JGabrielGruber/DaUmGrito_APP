import { Http } from '../models/http.model';
import { HttpService } from './../services/http.service';

export abstract class Service<T> {
	constructor(
		public url	: string,
		public http	: HttpService
	) {
		
	}

	get(): Promise<Http> {
		return this.http.get(this.url);
	}

	getById(id: string, token: any = null): Promise<Http> {
		return this.http.get(`${this.url}/${id}`, token);
	}

	post(model: T, token: any = null, message?:string): Promise<Http> {
		return this.http.post(this.url, model, token, message);
	}

	put(id: string, model: T, token: any = null, message?:string): Promise<Http> {
		return this.http.put(`${this.url}/${id}`, model, token, message);
	}

	delete(id: string, token: any = null, message?:string): Promise<Http> {
		return this.http.delete(`${this.url}/${id}`, token);
	}
}