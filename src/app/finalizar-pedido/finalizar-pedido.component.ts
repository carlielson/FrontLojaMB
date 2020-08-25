import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../service/produtos.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PedidoCliente } from '../model/models';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar-pedido.component.html',
  styleUrls: ['./finalizar-pedido.component.scss']
})
export class FinalizarPedidoComponent implements OnInit {
  public idLote: any;
  public formCliente: FormGroup;

  constructor(public _activatedRoute: ActivatedRoute,
    public _service: ProdutosService, 
    private messageService: MessageService,
    private _fb: FormBuilder,
    private _router: Router,) {
      this.idLote = this._activatedRoute.snapshot.paramMap.get('id');
       console.log(this.idLote);
     }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formCliente = this._fb.group({
      id: [null],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      telefone: [''],
    });
  }
  cadastrarCliente() {
    console.log(this.formCliente.value);
    if(this.formCliente.valid) {
      this._service.inserirCliente(this.formCliente.value).subscribe(
        result => {
          console.log(result);
          this.vincularClientePedido(result.id);
        },
        erro =>
        {
          console.log(erro)
        });
    } else {
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Campos obrigatórios não preenchidos!'});
    }
  }

  vincularClientePedido(idCliente: string) {
    if(idCliente !== null) {
      let pedidoCliente = new PedidoCliente();    
      pedidoCliente.idCliente = idCliente;
      pedidoCliente.idLote = this.idLote;
  
        this._service.vincularClientePedido(this.idLote, pedidoCliente).subscribe(
          result => {
            // this._router.navigate(['/pedido-realizado/'+ this.idLote]);
            if(result) {
              this.concluirPedido();
            }
          },
          erro =>
          {
            console.log(erro)
          });
      } 
    }

    concluirPedido() {
      this._service.concluirPedido(this.idLote).subscribe(
        result => {
          this._router.navigate(['/pedido-realizado/'+ this.idLote]);
        },
        erro =>
        {
          console.log(erro)
        });
    }
    
}
