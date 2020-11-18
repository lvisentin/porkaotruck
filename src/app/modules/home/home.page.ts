import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria';
import { ProdutosService } from 'src/app/services/produtos.service';
import { Produto } from 'src/app/interfaces/produto';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PorkaoResponse, SearchResponse } from 'src/app/interfaces/response.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  public slideOpts = {
    initialSlide: 1,
    slidesPerView: 2,
    speed: 400
  }

  public categoriaSelecionada: number;
  public combos: Produto[];
  public categorias: Categoria[];
  public categoriasShowable: Categoria[];
  public grupoProduto;
  public produtos;
  public endereco;

  public searchedItens;

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private produtosService: ProdutosService,
    private categoriasService: CategoriasService,
    private router: Router,
  ) { }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  ngOnInit() {
    console.log('on init home')
  }

  ionViewDidEnter() {
    if (!localStorage.getItem('taxaEntrega') || !localStorage.getItem('endereco')) { this.router.navigate(['tabs/home/endereco']) }
    else { this.endereco = JSON.parse(localStorage.getItem('endereco')) }
    // this.cdr.detectChanges();
    console.log('ion view did enter home')
    
    this.categoriaSelecionada = 1;
    this.getCategorias();
    this.getCombos();
  }

  selectCategoria(categoria) {
    this.categoriaSelecionada = categoria;
  }

  getCategorias() {
    const fields = { "produtos": ["nome", "descricao", "url_image"] };
    const filter = { "showable": true }
    this.categoriasService
    .getCategorias(filter, fields)
    .subscribe(
      (data) => {
        const categorias = data['data'].data;
        categorias.map((categoria) => {
          categoria.produtos.map((produto) => {
            this.calculaPrecoItem(produto);
          })
        })
        this.categorias = categorias;
        console.log(this.categorias)
      }
    )
  }

  getCombos() {
    const filter = { "categoria": 31 };
    this.produtosService.getProdutos(filter).subscribe(
      (data) => {
        const combos: Array<Produto> = data['data'].data;
        combos.map((produto) => {
          this.calculaPrecoItem(produto);
          console.log('produto', produto)
        });
        this.combos = combos;
        console.log(combos)
      }
    )
  }

  changeBusca(ev) {
    console.log(ev)
    const request = {
      "filter": {
        "nome": ev,
      },		
      paginate: 5,
			page: 1
    };

    this.produtosService
    .produtosSearch(request)
    .pipe(takeUntil(this.destroy))
    .subscribe((result: SearchResponse) => {
      this.searchedItens = result.data['data'];
      console.log(this.searchedItens)
    })
  }

  calculaPrecoItem(item) {
		if (item.preco[0].desconto_porc) {
      const discountMultiplier =  1 - (item.preco[0].desconto_porc / 100)
			item.vltotal = (item.preco[0].preco * discountMultiplier);
		} else if (item.preco[0].desconto_num) {
			item.vltotal = (item.preco[0].preco - item.preco[0].desconto_num);
		} else {
			item.vltotal = item.preco[0].preco;
		}
    
    if (item.adicionais) {
			item.adicionais.map((adicional) => {
				item.vltotal += adicional.adicional.preco[0].preco;
			})
		}
    console.log('item', item.vltotal)
		return item.vltotal;
	}

}
