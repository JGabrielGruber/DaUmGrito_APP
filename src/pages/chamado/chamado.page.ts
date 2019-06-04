import { LoginService } from './../../app/services/login.service';
import { ClienteReducer } from './../../app/models/clienteR.model';
import { ChamadoService } from './../../app/services/chamado.service';
import { Component, OnInit } from '@angular/core';
import { Chamado } from 'src/app/models/chamado.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

interface AppState {
	usuario: ClienteReducer
}

@Component({
	selector: 'app-chamado',
	templateUrl: './chamado.page.html',
	styleUrls: ['./chamado.page.scss'],
})
export class ChamadoPage implements OnInit {
	lista: Array<Chamado>	= new Array<Chamado>();
	usuario$: Observable<ClienteReducer>;

	constructor(
		private chamadoService: ChamadoService,
		private loginService: LoginService,
		private store: Store<AppState>,
		private router: Router
	) {
		this.usuario$	= this.store.select('cliente');
		this.listar();
	}

	ngOnInit() {
	}

	async listar(): Promise<void> {
		let token	= await this.loginService.getToken();
		this.usuario$.subscribe(async (data) => {
			if (data.data.cpf) {
				let response	= await this.chamadoService.getByCliente(data.data, token);
				if (response && response.success) {
					this.lista	= response.data;
				}
			}
		});
	}

	detalhes(item: Chamado) {
		this.router.navigate(['/home/chamado/detalhe'], { queryParams: { id: item._id } });
	}

}
