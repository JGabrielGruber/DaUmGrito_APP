import { Http } from '../models/http.model';
import { AlertService } from './alert.service';
import { NetworkService } from './network.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpinnerService } from './spinner.service';

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	constructor(
		private http: HttpClient,
		private spinnerSrv: SpinnerService,
		private alertSrv: AlertService,
		private networkSrv: NetworkService 
	) {

	}

	public get(url: string, token=null): Promise<Http> {
		//this.spinnerSrv.Show("Carregando os dados...");
		return new Promise((resolve) => {
			if (this.networkSrv.IsOnline) {
				let headers	= {};
				if (token) {
					headers['Authorization'] = token;
				}
				this.http.get(url, { headers })
					.subscribe(_res => {
						this.spinnerSrv.Hide();
						resolve({ success: true, data: _res, err: undefined });
					}, err => {
						this.spinnerSrv.Hide();
						this.alertSrv.toast('Não foi possível consultar os dados, verifique sua conexão e tente novamente', 'bottom');
						resolve({ success: false, data: undefined, err: err });
					});
			}
			else {
				this.alertSrv.toast('Você está Offline, conecte-se a internet!', 'bottom');
				resolve({ success: true, data: [], err: undefined });
			}
		});
	}

	public post(url: string, model: any, token = null, message?:string): Promise<Http> {
		//this.spinnerSrv.Show("Salvando informações...");
		return new Promise((resolve) => {
			if (this.networkSrv.IsOnline) {
				let headers	= {};
				if (token) {
					headers['Authorization'] = token;
				}
				this.http.post(url, model, { headers })
					.subscribe(_res => {
						this.spinnerSrv.Hide();
						resolve({ success: true, data: _res, err: undefined });
						if (message) {
							this.alertSrv.toast(message, 'bottom');
						}
					}, err => {
						this.spinnerSrv.Hide();
						console.error(err);
						if (err.error.message) {
							this.alertSrv.toast(err.error.message, 'bottom');
						}
						else
							this.alertSrv.toast('Não foi possível realizar o processamento da informação, verifique sua conexão e tente novamente', 'bottom');
						resolve({ success: false, data: undefined, err: err });
					});
			}
			else {
				this.alertSrv.toast('Você está Offline, conecte-se a internet!', 'bottom');
				resolve({ success: false, data: [], err: undefined });
			}
		});
	}

	public put(url: string, model: any, token = null, message?:string): Promise<Http> {
		//this.spinnerSrv.Show("Atualizando informações...");
		return new Promise((resolve) => {
			if (this.networkSrv.IsOnline) {
				let headers	= {};
				if (token) {
					headers['Authorization'] = token;
				}
				this.http.put(url, model, { headers })
					.subscribe(_res => {
						this.spinnerSrv.Hide();
						resolve({ success: true, data: _res, err: undefined });
						if (message) {
							this.alertSrv.toast(message, 'bottom');
						}
					}, err => {
						this.spinnerSrv.Hide();
						console.error(err);
						if (err.error.message) {
							this.alertSrv.toast(err.error.message, 'bottom');
						}
						else
							this.alertSrv.toast('Não foi possível realizar o processamento da informação, verifique sua conexão e tente novamente', 'bottom');
						resolve({ success: false, data: undefined, err: err });
					});
			}
			else {
				this.alertSrv.toast('Você está Offline, e infelizmente não pode ser enviado os dados!', 'bottom');
				resolve({ success: true, data: [], err: undefined });
			}
		});
	}

	public delete(url: string, token: any = null, message?:string): Promise<Http> {
		//this.spinnerSrv.Show("Removendo registro...");
		return new Promise((resolve) => {
			if (this.networkSrv.IsOnline) {
				let headers	= {};
				if (token) {
					headers['Authorization'] = token;
				}
				this.http.delete(url, { headers }).subscribe(_res => {
					this.spinnerSrv.Hide();
					resolve({ success: true, data: _res, err: undefined });
					if (message) {
						this.alertSrv.toast(message, 'bottom');
					}
				}, err => {
					this.spinnerSrv.Hide();
					console.error(err);
					if (err.error.message) {
						this.alertSrv.toast(err.error.message, 'bottom');
					}
					else
						this.alertSrv.toast('Não foi possível realizar o processamento da informação, verifique sua conexão e tente novamente', 'bottom');
					resolve({ success: false, data: undefined, err: err });
				});
			}
			else {
				this.alertSrv.toast('Você está Offline, e infelizmente não pode ser enviado os dados!', 'bottom');
				resolve({ success: true, data: [], err: undefined });
			}
		})
	}
}
