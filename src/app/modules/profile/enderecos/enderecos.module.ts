import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnderecosPageRoutingModule } from './enderecos-routing.module';

import { EnderecosPage } from './enderecos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnderecosPageRoutingModule,
  ],
  declarations: [EnderecosPage]
})
export class EnderecosPageModule {}
