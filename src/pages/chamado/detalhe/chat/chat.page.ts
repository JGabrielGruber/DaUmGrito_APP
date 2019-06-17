import { ClienteReducer } from './../../../../app/models/clienteR.model';
import { LoginService } from './../../../../app/services/login.service';
import { ChamadoService } from './../../../../app/services/chamado.service';
import { Component, OnInit } from '@angular/core';
import { Chamado } from 'src/app/models/chamado.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ResolucoesReducer } from 'src/app/models/resolucoesR.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ResolucoesService } from 'src/app/services/resolucoes.service';
import { ClienteService } from 'src/app/services/cliente.service';
import * as ResolucoesActions from '../../../../app/actions/resolucoes.action';

interface AppState {
	resolucoes:	ResolucoesReducer,
	usuario:	ClienteReducer
}

@Component({
	selector: 'app-chat',
	templateUrl: './chat.page.html',
	styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
	chamado:		Chamado = new Chamado();
	resolucoes$:	Observable<ResolucoesReducer>;
	usuario$:		Observable<ClienteReducer>;
	conteudo:		string;

	constructor(
		public route: ActivatedRoute,
		public router: Router,
		private store: Store<AppState>,
		private loginService: LoginService,
		private chamadoService: ChamadoService,
		private resolucoesService: ResolucoesService,
		private usuarioService: ClienteService
	) {
		this.route.queryParams.subscribe((params) => {
			if (params) {
				this.obterChamado(params.id);
			} else {
				this.obterChamado();
			}
		});
		this.resolucoes$	= this.store.select('resolucoes');
		this.usuario$		= this.store.select('cliente');
		this.syncChat();
	}

	ngOnInit() {
		this.scroll();
	}

	async obterChamado(id?: string): Promise<void> {
		if (this.router.getCurrentNavigation().extras.state) {
			this.chamado = await this.router.getCurrentNavigation().extras.state.chamado;
		} else if (id) {
			let token = await this.loginService.getToken();
			if (token && token != "") {
				let response = await this.chamadoService.getById(id, token);
				if (response.success) {
					this.chamado = response.data;
				}
			}
		}
	}

	async syncChat() {
		setTimeout(() => {
			ResolucoesActions.fetchResolucoes(this.resolucoesService, this.loginService, this.store, this.chamado._id);
			this.syncChat();
		}, 3000);
	}

	async send() {
		ResolucoesActions.postMensagem(this.resolucoesService, this.loginService, this.store, this.chamado._id, this.conteudo);
		this.conteudo	= "";
		this.scroll();
	}

	async scroll() {
		setTimeout(()=>{
			let el	= document.getElementById('chatMensagens');
			if (el)
				el.scrollTop = el.scrollHeight;
		}, 10);
	}
}
