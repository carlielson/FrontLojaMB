import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../service/produtos.service';

@Component({
  selector: 'app-pedido-realizado',
  templateUrl: './pedido-realizado.component.html',
  styleUrls: ['./pedido-realizado.component.scss']
})
export class PedidoRealizadoComponent implements OnInit {

public idLote: string;
public total: any;
public produtos: any[];
public cliente: any;

  constructor(public _activatedRoute: ActivatedRoute,
    public _service: ProdutosService, 
    private _router: Router,) { 
    this.idLote = this._activatedRoute.snapshot.paramMap.get('id');
    console.log(this.idLote);
  }

  ngOnInit(): void {
    this.getProdutos();
  }

  getProdutos() {
    this._service.Get('api/v1/produtos/pedido/lote/' + this.idLote)
    .subscribe(
      result => {
        this.produtos = result;
        this.getTotal();
        this.cliente = this.produtos[0].cliente;
      }
    )
  }

  getTotal(){
    this.total = 0;
    this.produtos.forEach(x => {
      this.total += x.produto.preco * x.quantidade;
    });    
  }
}
