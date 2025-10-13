export type UserRole = "vendedor" | "supervisor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Meta {
  id: string;
  vendedorId: string;
  vendedorName: string;
  titulo: string;
  descricao: string;
  valorMeta: number;
  valorAtual: number;
  data: string;
  status: "pendente" | "em_progresso" | "concluida" | "nao_concluida";
  createdAt: string;
}
