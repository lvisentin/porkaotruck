import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';

import { ListaPedidosPageRoutingModule } from './lista-pedidos-routing.module'
import { ListaPedidosPage } from './lista-pedidos.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ListaPedidosPage }]),
    ListaPedidosPageRoutingModule,
  ],
  declarations: [ListaPedidosPage]
})
export class ListaPedidosPageModule { }
