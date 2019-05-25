import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
	{
	  path: '',
	  redirectTo: '/home/main',
	  pathMatch: 'full'
	},
	{
	  path: '',
	  component: HomePage,
	  children: [
		{
		  path: 'main',
		  loadChildren: '../main/main.module#MainPageModule'
		}
	  ]
	}
  ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
