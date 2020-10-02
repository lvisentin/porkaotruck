import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-carrinho',
  templateUrl: './popover-carrinho.component.html',
  styleUrls: ['./popover-carrinho.component.scss'],
})
export class PopoverCarrinhoComponent implements OnInit {

  constructor(
    private readonly popoverController: PopoverController
  ) { }

  ngOnInit() {
  }

  removeItem() {
    this.popoverController.dismiss({removeItem: true});
  }
}