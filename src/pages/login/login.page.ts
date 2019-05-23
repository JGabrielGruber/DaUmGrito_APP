import { LoginService } from '../../app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	credentials = { client_id: null, client_secret: null };

	constructor(
		public navCtrl: NavController,
		private loginService: LoginService
	) { }

	ngOnInit() {
	}

	async logIn(): Promise<void> {
		let result = await this.loginService.auth(
			{
				client_id: this.credentials.client_id,
				client_secret: this.credentials.client_secret,
				grant_type: "client_credentials",
				access_token: null,
				token_type: null
			}
		);
		if (result.success) {
			this.loginService.setLogin(result.data);
			this.navCtrl.navigateRoot('/home');
		}
	}

	signUp() {
		this.navCtrl.navigateRoot('/signup');
	}

}