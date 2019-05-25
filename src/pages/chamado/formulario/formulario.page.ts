import { Chamado } from './../../../app/models/chamado.model';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
	selector: 'app-formulario',
	templateUrl: './formulario.page.html',
	styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {
	chamado: Chamado = new Chamado();

	constructor(
		private geolocation: Geolocation
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
		this.chamado.foto = "https://i1.sndcdn.com/artworks-000203162222-lfsd7a-t500x500.jpg";
	}

	async submit(): Promise<void> {

	}

}
