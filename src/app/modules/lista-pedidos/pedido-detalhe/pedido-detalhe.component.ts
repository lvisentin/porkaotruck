import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PorkaoResponse } from 'src/app/interfaces/response.model';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-pedido-detalhe',
  templateUrl: './pedido-detalhe.component.html',
  styleUrls: ['./pedido-detalhe.component.scss'],
})
export class PedidoDetalheComponent implements OnInit {

  public pedido;
  private pedidoId = this.activatedRoute.snapshot.params.id;
  private destroy: Subject<boolean> = new Subject<boolean>();
  private entrega = JSON.parse(localStorage.getItem('taxaEntrega'))
  public maxDeliveryDate;
  public minDeliveryDate;
  constructor(
    private pedidosService: PedidosService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.pedidosService.getPedido(this.pedidoId)
      .pipe(takeUntil(this.destroy))
      .subscribe((getPedidoResponse: PorkaoResponse) => {
        console.log(getPedidoResponse)
        this.pedido = getPedidoResponse.data;
        this.pedido.itens.forEach((item) => {
          this.calculaPrecoItem(item);
        })
        this.generateDeliveryTime(this.pedido);
        console.log(this.pedido)
      })
  }

  generateDeliveryTime(pedido) {
    const minDeliveryDate = new Date(pedido.created_at);
    minDeliveryDate.setMinutes(minDeliveryDate.getMinutes() + this.entrega.tempo_min);
    this.minDeliveryDate = minDeliveryDate;

  const maxDeliveryDate = new Date(pedido.created_at);
    maxDeliveryDate.setMinutes(maxDeliveryDate.getMinutes() + this.entrega.tempo_max);
    this.maxDeliveryDate = maxDeliveryDate;
  }

  calculaPrecoItem(item) {
		if (item.produto.preco[0].desconto_porc) {
			console.log('tem preco porc', item.produto.preco[0].desconto_porc)
      const discountMultiplier =  1 - (item.produto.preco[0].desconto_porc / 100)
      console.log('discount', discountMultiplier)
			item.vltotal = (item.produto.preco[0].preco * discountMultiplier) * item.quantidade;
		} else if (item.produto.preco[0].desconto_num) {
			item.vltotal = (item.produto.preco[0].preco - item.produto.preco[0].desconto_num) * item.quantidade;
		} else {
			item.vltotal = item.produto.preco[0].preco * item.quantidade;
		}
    
    if (item.adicionais) {
			item.adicionais.map((adicional) => {
				item.vltotal += adicional.adicional.preco[0].preco;
			})
		}

		return item.vltotal;
	}
}
