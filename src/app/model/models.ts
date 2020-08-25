

export class Produto {
    public id: string;
    public imagem: string;
    public nome: string;
    public preco: number;
    public quantidade: number;
  };

  export class Pedido {
    public idProduto: string;
    public quantidade: number;
  };

  export class PedidoCliente {
    public idCliente: string;
    public idLote: number;
  };