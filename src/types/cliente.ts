type StatusCliente =
  | "novo"
  | "visitado"
  | "negociando"
  | "fechado"
  | "inativo"
  | "pendente";
type PotencialCliente = "baixo" | "medio" | "alto" | string;

type ClienteVisita = {
  id: number;
  nome: string;
  contato: string;
  cargo: string;
  telefone: string;
  email: string;
  endereco: string;
  status: string;
  dataVisita?: string; // formato ISO ou data string ex: "2024-10-10"
  resultado?: string;
  proximoPasso?: string;
  valorNegociado?: number;
  potencial?: string;
};
