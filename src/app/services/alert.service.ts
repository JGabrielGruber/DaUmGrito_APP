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

	toast(title: string, position: string): void {
		(await this.toastCtrl.create({ message: title, position: position, duration: 3000 })).present();
	}

	alert(title: string, message: string): void {
		this.alertCtrl.create({
			title: title,
			message: message,
			buttons: ['Ok'],
			enableBackdropDismiss: false
		}).present();
	}

	confirm(title: string, message: string, callback: any): void {
		this.alertCtrl.create({
			title: title,
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
		})
			.present()
	}
}
