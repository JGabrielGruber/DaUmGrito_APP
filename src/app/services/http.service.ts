import { Http } from './../models/http';
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

	public get(url: string, token = null): Promise<Http> {
		this.spinnerSrv.Show("Carregando os dados...");
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
				this.alertSrv.toast('Você está Offline, e infelizmente não pode ser carregado os dados!', 'bottom');
				resolve({ success: true, data: [], err: undefined });
			}
		});
	}

	public post(url: string, model: any): Promise<Http> {
		this.spinnerSrv.Show("Salvando informações...");
		return new Promise((resolve) => {
			if (this.networkSrv.IsOnline) {
				this.http.post(url, model)
					.subscribe(_res => {
						this.spinnerSrv.Hide();
						resolve({ success: true, data: _res, err: undefined });
					}, err => {
						this.spinnerSrv.Hide();
						console.log(err);
						if (err.status == 400) {
							let msg = '';
							err.error.validation.forEach(_err => {
								msg += `<li>${_err.message}</li>`;
							});
							this.alertSrv.alert(err.error.message, msg);
						}
						else if (err.status == 404) {
							this.alertSrv.alert('Informação', err.error.message);
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

	public put(url: string, model: any): Promise<Http> {
		this.spinnerSrv.Show("Atualizando informações...");
		return new Promise((resolve) => {
			if (this.networkSrv.IsOnline) {
				this.http.put(url, model)
					.subscribe(_res => {
						this.spinnerSrv.Hide();
						resolve({ success: true, data: _res, err: undefined });
					}, err => {
						this.spinnerSrv.Hide();
						console.log(err);
						if (err.status == 400) {
							let msg = '';
							err.error.validation.forEach(_err => {
								msg += `<li>${_err.message}</li>`;
							});
							this.alertSrv.alert(err.error.message, msg);
						}
						else if (err.status == 404) {
							this.alertSrv.alert('Informação', err.error.message);
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

	public delete(url: string): Promise<Http> {
		this.spinnerSrv.Show("Removendo registro...");
		return new Promise((resolve) => {
			if (this.networkSrv.IsOnline) {
				this.http.delete(url).subscribe(_res => {
					this.spinnerSrv.Hide();
					resolve({ success: true, data: _res, err: undefined });
				}, err => {
					this.spinnerSrv.Hide();
					this.alertSrv.toast('Não foi possível realizar a exclusão do registro!', 'bottom');
					resolve({ success: true, data: undefined, err: err });
				});
			}
			else {
				this.alertSrv.toast('Você está Offline, e infelizmente não pode ser enviado os dados!', 'bottom');
				resolve({ success: true, data: [], err: undefined });
			}
		})
	}
}
