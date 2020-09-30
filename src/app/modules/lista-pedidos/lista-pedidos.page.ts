import { Component } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: 'lista-pedidos.page.html',
  styleUrls: ['lista-pedidos.page.scss']
})
export class ListaPedidosPage {

  public pedidos;
  private user;

  constructor(
    private pedidosService: PedidosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ionViewDidEnter() {
    if (this.user) {
      console.log(this.user)
      this.getPedidos();
    }
  }

  getPedidos() {
    this.pedidosService.getByUsuario(this.user.id).subscribe(
      (data) => {
        this.pedidos = data['data'];
        console.log('pedidos', this.pedidos)
        this.pedidos.map((pedido) => {
          pedido.mes = moment(pedido.created_at).locale('pt').format('MMMM');
          pedido.dia = moment(pedido.created_at).format('DD');
        })
      }
    );
  }

  goToPedido(id: number) {
    console.log('id pedido', id)
    this.router.navigate([`tabs/lista-pedidos/pedido/${id}`]);
  }

}
