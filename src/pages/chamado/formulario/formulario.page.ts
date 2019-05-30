import { Chamado } from './../../../app/models/chamado.model';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CameraService } from './../../../app/services/camera.service';

@Component({
	selector: 'app-formulario',
	templateUrl: './formulario.page.html',
	styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {
	chamado: Chamado = new Chamado();

	constructor(
		private geolocation: Geolocation,
		private cameraService: CameraService
	) { }

	ngOnInit() {
		this.geolocation.getCurrentPosition().then((resp) => {
			this.chamado.localizacao.latitude	= resp.coords.latitude;
			this.chamado.localizacao.longitude	= resp.coords.longitude;
		}).catch((error) => {
			alert("Problema ao obter sua localização");
		});
	}

	async takePicture(): Promise<void> {
		this.cameraService.askForPicture((photo) => {
			this.chamado.foto = photo;
		});
	}

	async submit(): Promise<void> {

	}

}
