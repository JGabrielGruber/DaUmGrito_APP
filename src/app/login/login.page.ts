import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from '@ionic/angular';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	credentials = { client_id: 0, client_secret: '' };

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private loginService: LoginService
	) { }

	ngOnInit() {
	}

	async logIn(): Promise<void> {
		let result = await this.loginService.auth(
			{
				client_id: this.credentials.client_id,
				client_secret: this.credentials.client_secret,
				grant_type: "client_credentials"
			}
		);
		if (result.success) {
			this.loginService.setLogin(result.data);
			//this.navCtrl.setRoot('TabsPage');
		}
	}

}
