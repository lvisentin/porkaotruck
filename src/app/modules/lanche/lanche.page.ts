import { Component, OnInit } from '@angular/core';
import { Ingrediente } from 'src/app/interfaces/ingrediente';

@Component({
  selector: 'app-lanche',
  templateUrl: './lanche.page.html',
  styleUrls: ['./lanche.page.scss'],
})
export class LanchePage implements OnInit {

  public ingredientes: Array<Ingrediente> = [
    {
      id: 1,
      nome: 'Bacon',
      valor: 3.50
    },
    {
      id: 2,
      nome: 'Alface',
      valor: 1
    },
    {
      id: 3,
      nome: 'Queijo',
      valor: 4
    },
    {
      id: 4,
      nome: 'Molho especial',
      valor: 3.50
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
