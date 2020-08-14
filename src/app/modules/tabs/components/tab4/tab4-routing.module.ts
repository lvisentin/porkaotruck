import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab4Page } from './tab4.page';
import { AuthGuard } from 'src/app/helpers/auth.guard';

const routes: Routes = [
	{
		path: '',
		component: Tab4Page,
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class Tab4PageRoutingModule {}
