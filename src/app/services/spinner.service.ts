import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class SpinnerService {

	private spinner: any = null;

	constructor(public loading: LoadingController) {

	}

	Show(message: string): void {
		if (this.spinner == null) {
			this.spinner = this.loading.create({ message: (message || 'Carregando...') });
			this.spinner.present();
		}
		else {
			this.spinner.data.message = message;
		}
	}

	Hide(): void {
		if (this.spinner != null) {
			this.spinner.dismiss();
			this.spinner = null;
		}
	}
}
