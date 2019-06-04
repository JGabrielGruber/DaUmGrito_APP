import { LoginService } from './../../../app/services/login.service';
import { ChamadoService } from './../../../app/services/chamado.service';
import { Component, OnInit } from '@angular/core';
import { Chamado } from 'src/app/models/chamado.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-detalhe',
	templateUrl: './detalhe.page.html',
	styleUrls: ['./detalhe.page.scss'],
})
export class DetalhePage implements OnInit {
	chamado: Chamado = new Chamado();

	constructor(
		private chamadoService: ChamadoService,
		private loginService: LoginService,
		public route: ActivatedRoute,
		public router: Router
	) {
		this.route.queryParams.subscribe((params) => {
			if (params) {
				this.obterChamado(params.id);
			}
		});
	}

	ngOnInit() {
		this.chamado.timestamp = "2012-12-15T13:47:20.789"
	}

	async obterChamado(id: string): Promise<void> {
		let token = await this.loginService.getToken();
		if (token && token != "") {
			let response = await this.chamadoService.getById(id, token);
			if (response.success) {
				this.chamado = response.data;
			}
		}
	}

	edit() {
		this.router.navigate(['/home/chamado/formulario'], { state: { chamado: this.chamado } });
	}

}
