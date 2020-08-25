import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, KeyValueDiffers, DoCheck } from '@angular/core';
import { Produto, Pedido } from '../model/models';
import { ProdutosService } from '../service/produtos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})

export class CarrinhoComponent implements OnInit, DoCheck  {
  public produtos: Produto[];
  @Input() cesta: Pedido[] = [];
  public meusPedidos: Produto[] = [];
  arrayDiffer: any;

  constructor(private _service: ProdutosService, 
              private kvDiffers: KeyValueDiffers) {
     }

  ngOnInit(): void {
    console.log(this.cesta);
    this.getProdutos();
    this.arrayDiffer = this.kvDiffers.find(this.cesta).create();
  }

  getProdutos() {
    this._service.Get('api/v1/produtos')
    .subscribe(
      result => {
        this.produtos = result;
        this.produtos.forEach(x=> x.quantidade = 0.0);
      }
    )
  }

  minhaCesta(){
    this.cesta.forEach(x => {
      let produto = this.produtos.find(x=> x.id == x.id);
      produto.quantidade = x.quantidade;
      this.meusPedidos.push(produto);
    });
    console.log("meus Pedidos: ");
    console.log(this.meusPedidos);
  }

  ngDoCheck() {
      const empArrayChanges = this.arrayDiffer.diff(this.cesta);
      if (empArrayChanges) {
        empArrayChanges.forEachAddedItem((record) => {
          let emp = record.currentValue;
          console.log('Added ' + emp.name);
        });

        empArrayChanges.forEachRemovedItem((record) => {
          let emp = record.previousValue;
          console.log('Removed ' + emp.name);
        });
        // this.minhaCesta();
      }      
  }
}
