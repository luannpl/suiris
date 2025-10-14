type Cliente = {
  id: number;
  nome: string;
  ultimaCompra: string;
  debito: number;
  contato: string;
};

type Vendedor = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  totalClientes: number;
  clientesInativos: number;
  debitoTotal: number;
  clientes: Cliente[];
};
