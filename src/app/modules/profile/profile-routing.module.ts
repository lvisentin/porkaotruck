import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { EnderecosPage } from './enderecos/enderecos.page';

const routes: Routes = [
	{
		path: '',
		component: ProfilePage,
	},
	{
		path: 'enderecos',
		component: EnderecosPage
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProfilePageRoutingModule { }
