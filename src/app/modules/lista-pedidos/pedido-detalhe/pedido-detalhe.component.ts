import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-pedido-detalhe',
  templateUrl: './pedido-detalhe.component.html',
  styleUrls: ['./pedido-detalhe.component.scss'],
})
export class PedidoDetalheComponent implements OnInit {

  public pedido;

  constructor(
    private pedidosService: PedidosService
  ) { }

  ngOnInit() {
    // this.pedidosService.getPedido();
  }

}
