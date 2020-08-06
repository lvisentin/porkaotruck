import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanchePage } from './lanche.page';

const routes: Routes = [
  {
    path: '',
    component: LanchePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LanchePageRoutingModule {}
