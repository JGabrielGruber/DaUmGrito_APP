import { AlertService } from './../../../app/services/alert.service';
import { LoginService } from './../../../app/services/login.service';
import { ChamadoService } from './../../../app/services/chamado.service';
import { Chamado } from './../../../app/models/chamado.model';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CameraService } from './../../../app/services/camera.service';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
	selector: 'app-formulario',
	templateUrl: './formulario.page.html',
	styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit{
	chamado: Chamado = new Chamado();

	constructor(
		private geolocation: Geolocation,
		private cameraService: CameraService,
		private platform: Platform,
		private chamadoService: ChamadoService,
		private loginService: LoginService,
		private location: Location,
		private alertService: AlertService
	) {}

	ngOnInit() {
		this.getLocation();
	}

	async getLocation(time: number=30000) {
		await this.platform.ready();
		await this.geolocation.getCurrentPosition({
			timeout: time,
			enableHighAccuracy: true
		}).then((resp) => {
			this.chamado.localizacao	= {
				latitude: resp.coords.latitude,
				longitude: resp.coords.longitude
			};
		}).catch((error) => {
			this.alertService.alert(
				"Erro de Localização",
				"Não conseguimos obter sua localização, ela está ativada no seu dispositivo?");
			console.log(error);
		});
	}

	async takePicture(): Promise<void> {
		this.cameraService.askForPicture((photo) => {
			this.chamado.foto = photo;
		});
	}

	async submit(): Promise<void> {
		await this.getLocation(1000);
		if (this.chamado.localizacao) {
			if ((await this.chamadoService.post(this.chamado, (await this.loginService.getToken()))).success) {
				this.location.back();
			}
		}
	}

}
