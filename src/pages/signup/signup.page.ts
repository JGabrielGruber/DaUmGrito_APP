import { NavController } from '@ionic/angular';
import { Usuario } from './../../app/models/usuario';
import { Component } from '@angular/core';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.page.html',
	styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
	cliente: Usuario = new Usuario();

	constructor(
		public navCtrl: NavController
	) { }

	async signUp(): Promise<void> {

	}

	cancel() {
		this.navCtrl.navigateRoot('/login');
	}

}
