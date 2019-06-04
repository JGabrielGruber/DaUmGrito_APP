import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChamadoPage } from './chamado.page';

const routes: Routes = [
	{
		path: '',
		component: ChamadoPage
	},
	{
		path: 'formulario',
		loadChildren: './formulario/formulario.module#FormularioPageModule'
	},
	{
		path: 'detalhe',
		loadChildren: './detalhe/detalhe.module#DetalhePageModule'
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes)
	],
	declarations: [ChamadoPage]
})
export class ChamadoPageModule { }
