import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'lanche/:id',
    loadChildren: () => import('./modules/lanche/lanche.module').then(m => m.LanchePageModule)
  },
  {
    path: 'carrinho',
    loadChildren: () => import('./modules/carrinho/carrinho.module').then( m => m.CarrinhoPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
