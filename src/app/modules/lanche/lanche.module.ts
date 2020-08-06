import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LanchePageRoutingModule } from './lanche-routing.module';

import { LanchePage } from './lanche.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LanchePageRoutingModule
  ],
  declarations: [LanchePage]
})
export class LanchePageModule {}
