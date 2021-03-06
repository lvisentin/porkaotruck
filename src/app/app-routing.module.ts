import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tabs/home'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./modules/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'produto/:id',
    loadChildren: () => import('./modules/produto/produto.module').then(m => m.ProdutoPageModule)
  },
  {
    path: 'carrinho',
    loadChildren: () => import('./modules/carrinho/carrinho.module').then(m => m.CarrinhoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterPageModule)
  },
  // {
  //   path: 'enderecos',
  //   loadChildren: () => import('./profile/enderecos/enderecos.module').then( m => m.EnderecosPageModule)
  // },

  

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
