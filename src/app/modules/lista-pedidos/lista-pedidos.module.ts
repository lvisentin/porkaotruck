import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';

import { ListaPedidosPageRoutingModule } from './lista-pedidos-routing.module'
import { ListaPedidosPage } from './lista-pedidos.page';
import { PedidoDetalheComponent } from './pedido-detalhe/pedido-detalhe.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ListaPedidosPageRoutingModule,
  ],
  declarations: [ 
    ListaPedidosPage,
    PedidoDetalheComponent,
  ],
})
export class ListaPedidosPageModule { }
