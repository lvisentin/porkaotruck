import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPedidosPage } from './lista-pedidos.page';
import { PedidoDetalheComponent } from './pedido-detalhe/pedido-detalhe.component';

const routes: Routes = [
  {
    path: '',
    component: ListaPedidosPage,
  },
  {
    path: 'pedido/:id',
    component: PedidoDetalheComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaPedidosPageRoutingModule { }
