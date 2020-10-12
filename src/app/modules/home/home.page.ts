import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria';
import { ProdutosService } from 'src/app/services/produtos.service';
import { Produto } from 'src/app/interfaces/produto';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Router } from '@angular/router';

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

  constructor(
    private produtosService: ProdutosService,
    private categoriasService: CategoriasService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log('on init home')
  }

  ionViewDidEnter() {
    if (!localStorage.getItem('taxaEntrega') || !localStorage.getItem('endereco')) { this.router.navigate(['/endereco']) }
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
    this.categoriasService.getCategorias(filter, fields).subscribe(
      (data) => {
        const categorias = data['data'].data;
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
        this.combos = combos;
        console.log(combos)
      }
    )
  }

}
