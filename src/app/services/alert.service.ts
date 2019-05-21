import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class AlertService {

	constructor(
		private alertCtrl: AlertController,
		private toastCtrl: ToastController) {

	}

	async toast(title: string, position: string): Promise<void> {
		(await this.toastCtrl.create({ message: title, position: 'bottom', duration: 3000 })).present();
	}

	async alert(title: string, message: string): Promise<void> {
		(await this.alertCtrl.create({
			message: message,
			buttons: ['Ok']
		})).present();
	}

	async confirm(title: string, message: string, callback: any): Promise<void> {
		(await this.alertCtrl.create({
			message: message,
			buttons: [
				{ text: "Não", role: 'Cancel', handler: () => { console.log('Confirm:Say:No'); } },
				{
					text: "Sim",
					handler: () => {
						callback();
					}
				}
			]
		})).present()
	}
}
