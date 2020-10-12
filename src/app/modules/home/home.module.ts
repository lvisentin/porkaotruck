import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';

import { HomePageRoutingModule } from './home-routing.module';
import { EnderecoPage } from '../endereco/endereco.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    EnderecoPage
  ]
})
export class HomePageModule { }
