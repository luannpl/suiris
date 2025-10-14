import { Cliente } from "./types";

// Simulação de dados de clientes
const MOCK_CLIENTES: Cliente[] = [
  {
    id: "1",
    vendedorId: "1",
    nomeRazaoSocial: "João Silva & Cia Ltda",
    email: "joao@silva.com",
    telefone: "(11) 99999-9999",
    endereco: "Rua das Flores, 123 - São Paulo, SP",
    dataUltimaCompra: "2024-10-01",
    inadimplente: false,
    valorDebitoTotal: 0,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    vendedorId: "1",
    nomeRazaoSocial: "Maria Santos Comércio",
    email: "maria.santos@email.com",
    telefone: "(11) 88888-8888",
    endereco: "Av. Principal, 456 - São Paulo, SP",
    dataUltimaCompra: "2024-09-15",
    inadimplente: true,
    valorDebitoTotal: 2500.5,
    createdAt: "2024-02-10",
  },
  {
    id: "3",
    vendedorId: "1",
    nomeRazaoSocial: "Café Central",
    email: "contato@cafecentral.com",
    telefone: "(11) 77777-7777",
    endereco: "Rua do Comércio, 789 - São Paulo, SP",
    dataUltimaCompra: "2024-10-10",
    inadimplente: false,
    valorDebitoTotal: 0,
    createdAt: "2024-03-05",
  },
  {
    id: "4",
    vendedorId: "1",
    nomeRazaoSocial: "Padaria do Bairro",
    email: "padariabairro@gmail.com",
    telefone: "(11) 66666-6666",
    endereco: "Rua Nova, 321 - São Paulo, SP",
    dataUltimaCompra: null,
    inadimplente: true,
    valorDebitoTotal: 1200.0,
    createdAt: "2024-04-20",
  },
  {
    id: "5",
    vendedorId: "1",
    nomeRazaoSocial: "Restaurante Boa Mesa",
    email: "boamesa@restaurante.com",
    telefone: "(11) 55555-5555",
    endereco: "Av. Gastronômica, 654 - São Paulo, SP",
    dataUltimaCompra: "2024-10-05",
    inadimplente: false,
    valorDebitoTotal: 0,
    createdAt: "2024-05-12",
  },
  {
    id: "6",
    vendedorId: "1",
    nomeRazaoSocial: "Supermercado São João",
    email: "compras@supermercadosaojoao.com.br",
    telefone: "(11) 4444-4444",
    endereco: "Av. São João, 1000 - São Paulo, SP",
    dataUltimaCompra: "2024-10-12",
    inadimplente: false,
    valorDebitoTotal: 0,
    createdAt: "2024-01-20",
  },
  {
    id: "7",
    vendedorId: "1",
    nomeRazaoSocial: "Lanchonete da Esquina",
    email: "lanchonete.esquina@hotmail.com",
    telefone: "(11) 3333-3333",
    endereco: "Rua da Esquina, 50 - São Paulo, SP",
    dataUltimaCompra: "2024-08-20",
    inadimplente: true,
    valorDebitoTotal: 850.75,
    createdAt: "2024-03-15",
  },
  {
    id: "8",
    vendedorId: "1",
    nomeRazaoSocial: "Hotel Vista Bela",
    email: "reservas@hotelvistabela.com.br",
    telefone: "(11) 2222-2222",
    endereco: "Rua Vista Bela, 200 - São Paulo, SP",
    dataUltimaCompra: "2024-10-08",
    inadimplente: false,
    valorDebitoTotal: 0,
    createdAt: "2024-02-28",
  },
  {
    id: "9",
    vendedorId: "1",
    nomeRazaoSocial: "Distribuidora Alimentos S.A.",
    email: "pedidos@distribuidoraalimentos.com.br",
    telefone: "(11) 1111-1111",
    endereco: "Av. Industrial, 500 - São Paulo, SP",
    dataUltimaCompra: "2024-09-30",
    inadimplente: true,
    valorDebitoTotal: 5750.25,
    createdAt: "2024-01-10",
  },
  {
    id: "10",
    vendedorId: "1",
    nomeRazaoSocial: "Café Gourmet Premium",
    email: "atendimento@cafegourmetpremium.com",
    telefone: "(11) 9876-5432",
    endereco: "Rua Gourmet, 88 - São Paulo, SP",
    dataUltimaCompra: "2024-10-11",
    inadimplente: false,
    valorDebitoTotal: 0,
    createdAt: "2024-06-01",
  },
  {
    id: "11",
    vendedorId: "1",
    nomeRazaoSocial: "Mercadinho do João",
    email: "joao.mercadinho@gmail.com",
    telefone: "(11) 8765-4321",
    endereco: "Rua do Mercado, 15 - São Paulo, SP",
    dataUltimaCompra: "2024-07-10",
    inadimplente: true,
    valorDebitoTotal: 320.5,
    createdAt: "2024-04-05",
  },
  {
    id: "12",
    vendedorId: "1",
    nomeRazaoSocial: "Confeitaria Doce Vida",
    email: "contato@docevida.com.br",
    telefone: "(11) 7654-3210",
    endereco: "Av. Doce, 250 - São Paulo, SP",
    dataUltimaCompra: "2024-10-07",
    inadimplente: false,
    valorDebitoTotal: 0,
    createdAt: "2024-05-20",
  },
  {
    id: "13",
    vendedorId: "1",
    nomeRazaoSocial: "Bar e Petiscaria Central",
    email: "central.bar@outlook.com",
    telefone: "(11) 6543-2109",
    endereco: "Rua Central, 300 - São Paulo, SP",
    dataUltimaCompra: null,
    inadimplente: false,
    valorDebitoTotal: 0,
    createdAt: "2024-08-15",
  },
  {
    id: "14",
    vendedorId: "1",
    nomeRazaoSocial: "Atacadista BomPreço Ltda",
    email: "vendas@bompreco.com.br",
    telefone: "(11) 5432-1098",
    endereco: "Rod. BomPreço, km 25 - São Paulo, SP",
    dataUltimaCompra: "2024-09-28",
    inadimplente: true,
    valorDebitoTotal: 3200.8,
    createdAt: "2024-02-15",
  },
  {
    id: "15",
    vendedorId: "1",
    nomeRazaoSocial: "Pizzaria Bella Napoli",
    email: "pedidos@bellanapoli.com.br",
    telefone: "(11) 4321-0987",
    endereco: "Av. Itália, 150 - São Paulo, SP",
    dataUltimaCompra: "2024-10-09",
    inadimplente: false,
    valorDebitoTotal: 0,
    createdAt: "2024-07-08",
  },
];

// Simulação de localStorage para persistência
const STORAGE_KEY = "clientes_data";

// Função para inicializar dados mockados no localStorage (força recriação)
export const initializeMockData = (): void => {
  if (typeof window === "undefined") return;

  // Força a recriação dos dados mockados para garantir os IDs corretos
  localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_CLIENTES));
};
export const getClientesByVendedor = (vendedorId: string): Cliente[] => {
  if (typeof window === "undefined")
    return MOCK_CLIENTES.filter((c) => c.vendedorId === vendedorId);

  // Inicializa dados mockados se não existirem
  initializeMockData();

  const stored = localStorage.getItem(STORAGE_KEY);
  const clientes = stored ? JSON.parse(stored) : MOCK_CLIENTES;
  return clientes.filter(
    (cliente: Cliente) => cliente.vendedorId === vendedorId
  );
};

export const addCliente = (
  cliente: Omit<Cliente, "id" | "createdAt">
): void => {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(STORAGE_KEY);
  const clientes: Cliente[] = stored ? JSON.parse(stored) : MOCK_CLIENTES;

  const newCliente: Cliente = {
    ...cliente,
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split("T")[0],
  };

  clientes.push(newCliente);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
};

export const updateCliente = (
  id: string,
  updatedData: Partial<Cliente>
): void => {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(STORAGE_KEY);
  const clientes: Cliente[] = stored ? JSON.parse(stored) : MOCK_CLIENTES;

  const index = clientes.findIndex((cliente) => cliente.id === id);
  if (index !== -1) {
    clientes[index] = { ...clientes[index], ...updatedData };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
  }
};

export const deleteCliente = (id: string): void => {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(STORAGE_KEY);
  const clientes: Cliente[] = stored ? JSON.parse(stored) : MOCK_CLIENTES;

  const filteredClientes = clientes.filter((cliente) => cliente.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredClientes));
};
