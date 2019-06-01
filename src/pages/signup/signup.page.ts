import { CameraService } from './../../app/services/camera.service';
import { ClienteService } from './../../app/services/cliente.service';
import { Cliente } from './../../app/models/cliente.model';
import { ClienteReducer } from './../../app/models/clienteR.model';
import { Component } from '@angular/core';
import * as ClienteActions from '../../app/actions/cliente.action';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';


interface AppState {
	cliente: ClienteReducer
}
@Component({
	selector: 'app-signup',
	templateUrl: './signup.page.html',
	styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
	cliente: Cliente = new Cliente();
	cliente$: Observable<ClienteReducer>;

	constructor(
		public router: Router,
		private clienteService: ClienteService,
		private store: Store<AppState>,
		private cameraService: CameraService
	) {
		this.cliente$ = this.store.select('cliente');
	}

	async signUp(): Promise<void> {
		let result	= await ClienteActions.postCliente(this.clienteService, this.store, this.cliente);
		if (result && result.success) {
			this.router.navigateByUrl('/login');
		}
	}

	async takePicture(): Promise<void> {
		this.cameraService.askForPicture((photo) => {
			this.cliente.foto = photo;
		});
	}

	cancel() {
		this.router.navigateByUrl('/login');
	}

}
