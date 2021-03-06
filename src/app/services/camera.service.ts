import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

	constructor(
		private camera: Camera,
		private actionSC: ActionSheetController,
		private alertService: AlertService,
		private platform: Platform
	) {}

	private _getPicture(source: number, callback): void {
		let options: CameraOptions = {
			quality: 70,
			destinationType: this.camera.DestinationType.DATA_URL,
			sourceType: source,
			allowEdit: false,
			encodingType: this.camera.EncodingType.JPEG,
			saveToPhotoAlbum: false,
			correctOrientation: true,
			targetWidth: 400,
			targetHeight: 400,
		}
		this.camera.getPicture(options).then(
			(imgData) => {
				let base64Image = `data:image/jpeg;base64,${imgData}`
				callback(base64Image);
			},
			err => {
				this.alertService.alert("Nenhuma foto obtida", "");
				console.log('Problema ao capturar a foto', err);
			});
	}

	public getPictureFromGalery(callback): void {
		this._getPicture(this.camera.PictureSourceType.PHOTOLIBRARY,
			photo => {
				callback(photo)
			});
	}

	public takePicture(callback): void {
		this._getPicture(this.camera.PictureSourceType.CAMERA,
			photo => {
				callback(photo)
			});
	}

	public async askForPicture(callback): Promise<void> {
		(await this.actionSC.create({
			buttons: [
				{
					text: 'Tirar foto',
					handler: () => {
						this.takePicture(callback);
					},
					icon: this.platform.is('ios') ? null : 'camera'
				},
				{
					text: 'Abrir galeria',
					handler: (() => {
						this.getPictureFromGalery(callback);
					}),
					icon: this.platform.is('ios') ? null : 'images'
				},
				{
					text: 'Cancelar',
					role: 'destrutive',
					icon: this.platform.is('ios') ? null : 'close',
					handler: () => {}
				}
			]
		})).present();
	}
}