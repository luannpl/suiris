import { Cliente } from "./types";

// Simulação de dados de clientes
const MOCK_CLIENTES: Cliente[] = [
  {
    id: "1",
    vendedorId: "1",
    nomeRazaoSocial: "João Silva & Cia Ltda",
    email: "joao@silva.com",
    telefone: "(85) 99999-9999",
    endereco: "Av. Beira Mar, 123 - Fortaleza, CE",
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
    telefone: "(85) 98888-8888",
    endereco: "Rua Desembargador Moreira, 456 - Fortaleza, CE",
    dataUltimaCompra: "2024-09-15",
    inadimplente: true,
    valorDebitoTotal: 2500.5,
    createdAt: "2024-02-10",
  },
  {
    id: "3",
    vendedorId: "2",
    nomeRazaoSocial: "Café Central",
    email: "contato@cafecentral.com",
    telefone: "(85) 97777-7777",
    endereco: "Rua Major Facundo, 789 - Fortaleza, CE",
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
    telefone: "(85) 96666-6666",
    endereco: "Rua Juvenal Galeno, 321 - Fortaleza, CE",
    dataUltimaCompra: "2024-10-10",
    inadimplente: true,
    valorDebitoTotal: 1200.0,
    createdAt: "2024-04-20",
  },
  {
    id: "5",
    vendedorId: "2",
    nomeRazaoSocial: "Restaurante Boa Mesa",
    email: "boamesa@restaurante.com",
    telefone: "(85) 95555-5555",
    endereco: "Av. Monsenhor Tabosa, 654 - Fortaleza, CE",
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
    telefone: "(85) 94444-4444",
    endereco: "Av. Domingos Olímpio, 1000 - Fortaleza, CE",
    dataUltimaCompra: "2024-10-12",
    inadimplente: false,
    valorDebitoTotal: 0,
    createdAt: "2024-01-20",
  },
  {
    id: "7",
    vendedorId: "2",
    nomeRazaoSocial: "Lanchonete da Esquina",
    email: "lanchonete.esquina@hotmail.com",
    telefone: "(85) 93333-3333",
    endereco: "Rua José Vilar, 50 - Fortaleza, CE",
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
    telefone: "(85) 92222-2222",
    endereco: "Rua Canuto de Aguiar, 200 - Fortaleza, CE",
    dataUltimaCompra: "2024-10-08",
    inadimplente: false,
    valorDebitoTotal: 0,
    createdAt: "2024-02-28",
  },
  {
    id: "9",
    vendedorId: "2",
    nomeRazaoSocial: "Distribuidora Alimentos S.A.",
    email: "pedidos@distribuidoraalimentos.com.br",
    telefone: "(85) 91111-1111",
    endereco: "Av. Alberto Nepomuceno, 500 - Fortaleza, CE",
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
    telefone: "(85) 99876-5432",
    endereco: "Rua Barbosa de Freitas, 88 - Fortaleza, CE",
    dataUltimaCompra: "2024-10-11",
    inadimplente: false,
    valorDebitoTotal: 0,
    createdAt: "2024-06-01",
  },
  {
    id: "11",
    vendedorId: "2",
    nomeRazaoSocial: "Mercadinho do João",
    email: "joao.mercadinho@gmail.com",
    telefone: "(85) 98765-4321",
    endereco: "Rua Padre Valdevino, 15 - Fortaleza, CE",
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
    telefone: "(85) 97654-3210",
    endereco: "Av. Santos Dumont, 250 - Fortaleza, CE",
    dataUltimaCompra: "2024-10-07",
    inadimplente: false,
    valorDebitoTotal: 0,
    createdAt: "2024-05-20",
  },
  {
    id: "13",
    vendedorId: "2",
    nomeRazaoSocial: "Bar e Petiscaria Central",
    email: "central.bar@outlook.com",
    telefone: "(85) 96543-2109",
    endereco: "Rua Dragão do Mar, 300 - Fortaleza, CE",
    dataUltimaCompra: "2024-10-07",
    inadimplente: false,
    valorDebitoTotal: 0,
    createdAt: "2024-08-15",
  },
  {
    id: "14",
    vendedorId: "1",
    nomeRazaoSocial: "Atacadista BomPreço Ltda",
    email: "vendas@bompreco.com.br",
    telefone: "(85) 95432-1098",
    endereco: "Av. Washington Soares, km 25 - Fortaleza, CE",
    dataUltimaCompra: "2024-09-28",
    inadimplente: true,
    valorDebitoTotal: 3200.8,
    createdAt: "2024-02-15",
  },
  {
    id: "15",
    vendedorId: "2",
    nomeRazaoSocial: "Pizzaria Bella Napoli",
    email: "pedidos@bellanapoli.com.br",
    telefone: "(85) 94321-0987",
    endereco: "Av. Dom Luís, 150 - Fortaleza, CE",
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
