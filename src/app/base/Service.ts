import { Http } from '../models/http.model';
import { HttpService } from './../services/http.service';

export abstract class Service<T> {
	constructor(
		public url	: string,
		public http	: HttpService
	) {
		
	}

	get() : Promise<Http> {
		return this.http.get(this.url);
	}

	getById(id : string) : Promise<Http> {
		return this.http.get(`${this.url}/${id}`);
	}

	post(model : T, token : any = null) : Promise<Http> {
		return this.http.post(this.url, model, token);
	}

	put(id : string, model : T) : Promise<Http> {
		return this.http.put(`${this.url}/${id}`, model);
	}

	delete(id : string) : Promise<Http> {
		return this.http.delete(`${this.url}/${id}`);
	}
}