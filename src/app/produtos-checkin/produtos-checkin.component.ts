import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../service/produtos.service';
import { Produto } from '../model/models';

@Component({
  selector: 'app-produtos-checkin',
  templateUrl: './produtos-checkin.component.html',
  styleUrls: ['./produtos-checkin.component.scss']
})
export class ProdutosCheckinComponent implements OnInit {
  public idLote: any;
  public produtos: any[];
  public total = 0;
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
          console.log(result);
          console.log(this.produtos);
          this.getTotal();
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
    this.getTotal();
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
    this.getTotal();
  }

  getTotal(){
    this.total = 0;
    this.produtos.forEach(x => {
      this.total += x.produto.preco * x.quantidade;
    });    
  }

  finalizarCompra() {
    if(this.produtos.length > 0) {
          this._service.atualizarPedidos(this.idLote, this.produtos).subscribe(
            result => {
              this._router.navigate(['/finalizar-pedido/'+ this.idLote]);
            },
            erro =>
            {
              console.log(erro)
            });
        }    
    }
}
