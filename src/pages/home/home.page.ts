import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


import { ClienteReducer } from './../../app/models/clienteR.model';
import { UsuarioService } from '../../app/services/usuario.service';
import { LoginService } from '../../app/services/login.service';
import * as ClienteActions from '../../app/actions/cliente.action';

interface AppState {
	usuario: ClienteReducer
}

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
	usuario$: Observable<ClienteReducer>;

	constructor(
		public router: Router,
		private menu: MenuController,
		private loginService: LoginService,
		private usuarioService: UsuarioService,
		private store: Store<AppState>
	) {}

	ngOnInit() {
		this.usuario$	= this.store.select('cliente');
		this.check();
	}

	async check() {
		if ((await this.loginService.getToken())) {
			ClienteActions.fetchUsuario(this.loginService, this.usuarioService, this.store);
		} else {
			this.router.navigateByUrl('/login');
		}
	}

	go(url) {
		this.router.navigateByUrl(url);
		this.menu.close();
	}

	async logOff() {
		this.loginService.unsetLogin();
		this.store.dispatch(new ClienteActions.UnsetCliente());
		this.menu.close();
		this.router.navigateByUrl('/login');
	}
}
