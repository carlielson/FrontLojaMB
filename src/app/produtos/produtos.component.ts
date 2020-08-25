import { Component, OnInit } from '@angular/core';
import { ProdutosService } from "../service/produtos.service";
import { Produto, Pedido } from "../model/models";
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  public produtos: Produto[];
  public cesta: Pedido[] = [];

  constructor(public _service: ProdutosService, 
    private messageService: MessageService,
    private _router: Router,) { }

  ngOnInit(): void {
    console.log('aqui');
    this.getProdutos();
  }

  getProdutos() {
    this._service.Get('api/v1/produtos')
    .subscribe(
      result => {
        this.produtos = result;
        console.log(result);
        console.log(this.produtos);
        this.produtos.forEach(x=> x.quantidade = 0.0);
      }
    )
  }

  add(id: string) 
  {
    this.produtos.forEach(item => {
      if(item.id == id) {
        if(item.quantidade >= 0){
          item.quantidade ++;
        }
      }
    });
    console.log(this.produtos);
  }

  remove(id: string) {
    this.produtos.forEach(item => {
      if(item.id == id) {
        if(item.quantidade > 0){
          item.quantidade --;
        }
      }
    });
    console.log(this.produtos);
  }

  addCesta(id: string) {
    let item = this.produtos.find(x=> x.id == id);
    if(item.quantidade === 0)
      item.quantidade = 1
    
    let pedido: Pedido = new Pedido();
    pedido.idProduto = item.id;
    pedido.quantidade = item.quantidade;
    this.cesta.push(pedido);  
    this.produtos.forEach(x=> x.quantidade = 0.0);    
  }

  confirmar() {
    // let pedido: Pedido[] = [];
    // this.produtos.filter(x=> x.quantidade > 0).forEach(x => {
    //   let p: Pedido = new Pedido();
    //   p.idProduto = x.id;
    //   p.quantidade = x.quantidade;
    //   pedido.push(p);
    // });

    if(this.cesta.length > 0) {
      this._service.inserirProduto(this.cesta).subscribe(
        result => {
          localStorage.setItem("LotePedido", result);
          this._router.navigate(['/produtos-checkin/'+ result]);
        },
        erro =>
        {
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Ocorreu um erro ao inserir produtos!'});
          console.log(erro)
        });
    }    
  }
}
