import { Usuario } from '../../app/models/usuario.model';
import { UsuarioService } from '../../app/services/usuario.service';
import { LoginService } from '../../app/services/login.service';
import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	usuario: Usuario = new Usuario();

	constructor(
		public navCtrl: NavController,
		private menu: MenuController,
		private login: LoginService,
		private usuarioSV: UsuarioService
	) {
		this.check();
	}
	openFirst() {
		this.menu.open('first');
	}

	async check() {
		let token	= await this.login.getToken();
		if (token) {
			let response	= await this.usuarioSV.getData(token);
			if (response.success) {
				this.usuario	= response.data;
			}
		} else {
			this.navCtrl.navigateRoot('/login');
		}
	}

	async logOff() {
		await this.login.unsetLogin();
		this.navCtrl.navigateRoot('/login');
	}
}
