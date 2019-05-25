import { ClienteService } from './../../app/services/cliente.service';
import { Cliente } from './../../app/models/cliente.model';
import { ClienteReducer } from './../../app/models/clienteR.model';
import { NavController } from '@ionic/angular';
import { Usuario } from '../../app/models/usuario.model';
import { Component } from '@angular/core';
import * as ClienteActions from '../../app/actions/cliente.action';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';


interface AppState {
	cliente: ClienteReducer
}
@Component({
	selector: 'app-signup',
	templateUrl: './signup.page.html',
	styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
	cliente: Usuario = new Usuario();
	cliente$: Observable<ClienteReducer>;

	constructor(
		public navCtrl: NavController,
		private clienteService: ClienteService,
		private store: Store<AppState>
	) {
		this.cliente$ = this.store.select('cliente');
	}

	async signUp(): Promise<void> {
		let result	= await ClienteActions.postCliente(this.clienteService, this.store, this.cliente);
		if (result && result.success) {
			this.navCtrl.navigateRoot('/login');
		}
	}

	cancel() {
		this.navCtrl.navigateRoot('/login');
	}

}
