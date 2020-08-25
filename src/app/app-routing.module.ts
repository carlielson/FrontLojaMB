import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutosCheckinComponent } from './produtos-checkin/produtos-checkin.component';
import { FinalizarPedidoComponent } from './finalizar-pedido/finalizar-pedido.component';
import { PedidoRealizadoComponent } from './pedido-realizado/pedido-realizado.component';

const routes: Routes = [
  {
    path: 'produtos',
    component: ProdutosComponent,
    data: { title: 'Lista de Produtos' }
  },
  { path: 'produtos-checkin/:id', component: ProdutosCheckinComponent },
  { path: 'finalizar-pedido/:id', component: FinalizarPedidoComponent },
  { path: 'pedido-realizado/:id', component: PedidoRealizadoComponent },
  { path: '',
    redirectTo: '/produtos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
