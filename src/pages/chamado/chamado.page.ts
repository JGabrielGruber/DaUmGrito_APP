import { ChamadoReducer } from './../../app/models/chamadoR.model';
import { Component, OnInit } from '@angular/core';
import { Chamado } from 'src/app/models/chamado.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { ChamadoLight } from './../../app/models/chamadoL.model';
import { LoginService } from './../../app/services/login.service';
import { ClienteReducer } from './../../app/models/clienteR.model';
import { ChamadoService } from './../../app/services/chamado.service';
import * as ClienteActions from './../../app/actions/chamado.action';

interface AppState {
	usuario: ClienteReducer,
	chamados: ChamadoReducer
}

@Component({
	selector: 'app-chamado',
	templateUrl: './chamado.page.html',
	styleUrls: ['./chamado.page.scss'],
})
export class ChamadoPage implements OnInit {
	usuario$: Observable<ClienteReducer>;
	chamados$: Observable<ChamadoReducer>;

	constructor(
		private chamadoService: ChamadoService,
		private loginService: LoginService,
		private store: Store<AppState>,
		private router: Router
	) {
		this.usuario$	= this.store.select('cliente');
		this.chamados$	= this.store.select('chamados');
	}

	ngOnInit() {
		this.listar();
	}

	async listar(): Promise<void> {
		ClienteActions.fetchChamados(this.chamadoService, this.loginService, this.store);
	}

	detalhes(item: Chamado) {
		this.router.navigate(['/home/chamado/detalhe'], { queryParams: { id: item._id } });
	}

}
