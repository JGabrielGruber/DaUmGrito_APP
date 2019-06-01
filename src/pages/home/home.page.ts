import { Cliente } from './../../app/models/cliente.model';
import { UsuarioService } from '../../app/services/usuario.service';
import { LoginService } from '../../app/services/login.service';
import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	usuario: Cliente = new Cliente();

	constructor(
		public router: Router,
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
			this.router.navigateByUrl('/login');
		}
	}

	go(url) {
		this.router.navigateByUrl(url);
	}

	async logOff() {
		await this.login.unsetLogin();
		this.router.navigateByUrl('/login');
	}
}
