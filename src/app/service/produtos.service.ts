import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ProdutosService {

  
  constructor(private _http: HttpClient) { }

  public Get(route: string): Observable<any> {
    console.log(environment.urlApi + route);
    return this._http.get(environment.urlApi + route, httpOptions);
  }

  public inserirProduto(produto:any[]): Observable<any> {
    return this._http.post(environment.urlApi + "api/v1/produtos/pedidos", produto, httpOptions);
  }

  public atualizarPedidos(idLote: string, produto:any[]): Observable<any> {
    return this._http.put(environment.urlApi + "api/v1/produtos/pedidos/atualizar/"+ idLote, produto, httpOptions);
  }

  public inserirCliente(cliente: any): Observable<any> {
    return this._http.post(environment.urlApi + "api/v1/produtos/cliente", cliente, httpOptions);
  }

  public vincularClientePedido(idLote: string, pedido: any): Observable<any> {
    return this._http.put(environment.urlApi + "api/v1/produtos/pedidos/cliente/"+ idLote, pedido, httpOptions);
  }

  public concluirPedido(idLote: string): Observable<any> {
    return this._http.get(environment.urlApi + "api/v1/produtos/concluir/pedido/"+ idLote, httpOptions);
  }

}
