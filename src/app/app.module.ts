import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutosCheckinComponent } from './produtos-checkin/produtos-checkin.component';
import { FinalizarPedidoComponent } from './finalizar-pedido/finalizar-pedido.component';
import { PedidoRealizadoComponent } from './pedido-realizado/pedido-realizado.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule, IConfig } from 'ngx-mask';
const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    ProdutosComponent,
    ProdutosCheckinComponent,
    FinalizarPedidoComponent,
    PedidoRealizadoComponent,
    CarrinhoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [MessageService,{ provide: DEFAULT_CURRENCY_CODE, useValue: 'pt-BR' },],
  bootstrap: [AppComponent]
})
export class AppModule { }
