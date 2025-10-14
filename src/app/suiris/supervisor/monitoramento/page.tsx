"use client";
import React, { useState } from "react";
import {
  Users,
  AlertCircle,
  DollarSign,
  Calendar,
  TrendingDown,
  Search,
  Filter,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  X,
  Clock,
} from "lucide-react";

export default function ClientesInativos() {
  const [vendedorExpandido, setVendedorExpandido] = useState(null);
  const [filtroDebito, setFiltroDebito] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalReuniao, setModalReuniao] = useState(false);
  const [vendedorSelecionado, setVendedorSelecionado] =
    useState<Vendedor | null>(null);
  const [dataReuniao, setDataReuniao] = useState("");
  const [horaReuniao, setHoraReuniao] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const vendedores = [
    {
      id: 1,
      nome: "João Silva",
      email: "joao.silva@empresa.com",
      telefone: "(85) 98765-4321",
      totalClientes: 45,
      clientesInativos: 12,
      debitoTotal: 28500,
      clientes: [
        {
          id: 1,
          nome: "Empresa Alpha Tech",
          ultimaCompra: "95 dias",
          debito: 8500,
          contato: "Carlos CEO",
        },
        {
          id: 2,
          nome: "Beta Solutions",
          ultimaCompra: "78 dias",
          debito: 12000,
          contato: "Maria Diretora",
        },
        {
          id: 3,
          nome: "Gamma Corp",
          ultimaCompra: "65 dias",
          debito: 5500,
          contato: "Pedro Gerente",
        },
        {
          id: 4,
          nome: "Delta Industries",
          ultimaCompra: "89 dias",
          debito: 2500,
          contato: "Ana Compradora",
        },
      ],
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria.santos@empresa.com",
      telefone: "(85) 98888-7777",
      totalClientes: 38,
      clientesInativos: 8,
      debitoTotal: 15200,
      clientes: [
        {
          id: 5,
          nome: "Epsilon Ltd",
          ultimaCompra: "72 dias",
          debito: 6200,
          contato: "João Financeiro",
        },
        {
          id: 6,
          nome: "Zeta Business",
          ultimaCompra: "81 dias",
          debito: 4500,
          contato: "Carla Gestora",
        },
        {
          id: 7,
          nome: "Eta Services",
          ultimaCompra: "68 dias",
          debito: 3000,
          contato: "Roberto Diretor",
        },
        {
          id: 8,
          nome: "Theta Group",
          ultimaCompra: "94 dias",
          debito: 1500,
          contato: "Lucia Compradora",
        },
      ],
    },
    {
      id: 3,
      nome: "Pedro Oliveira",
      email: "pedro.oliveira@empresa.com",
      telefone: "(85) 99999-1234",
      totalClientes: 52,
      clientesInativos: 15,
      debitoTotal: 42800,
      clientes: [
        {
          id: 9,
          nome: "Iota Technologies",
          ultimaCompra: "105 dias",
          debito: 18000,
          contato: "Fernando CEO",
        },
        {
          id: 10,
          nome: "Kappa Industries",
          ultimaCompra: "88 dias",
          debito: 9800,
          contato: "Patricia Diretora",
        },
        {
          id: 11,
          nome: "Lambda Corp",
          ultimaCompra: "76 dias",
          debito: 8500,
          contato: "Ricardo Gestor",
        },
        {
          id: 12,
          nome: "Mu Solutions",
          ultimaCompra: "63 dias",
          debito: 6500,
          contato: "Sandra Compradora",
        },
      ],
    },
    {
      id: 4,
      nome: "Ana Costa",
      email: "ana.costa@empresa.com",
      telefone: "(85) 97777-5555",
      totalClientes: 41,
      clientesInativos: 6,
      debitoTotal: 9500,
      clientes: [
        {
          id: 13,
          nome: "Nu Enterprises",
          ultimaCompra: "67 dias",
          debito: 4200,
          contato: "Marcos Financeiro",
        },
        {
          id: 14,
          nome: "Xi Business",
          ultimaCompra: "82 dias",
          debito: 3100,
          contato: "Julia Gestora",
        },
        {
          id: 15,
          nome: "Omicron Ltd",
          ultimaCompra: "71 dias",
          debito: 2200,
          contato: "Bruno Diretor",
        },
      ],
    },
  ];

  const vendedoresFiltrados = vendedores.filter((v) => {
    const matchSearch = v.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDebito =
      filtroDebito === "todos" ||
      (filtroDebito === "alto" && v.debitoTotal > 25000) ||
      (filtroDebito === "medio" &&
        v.debitoTotal >= 10000 &&
        v.debitoTotal <= 25000) ||
      (filtroDebito === "baixo" && v.debitoTotal < 10000);
    return matchSearch && matchDebito;
  });

  const toggleVendedor = (id: any) => {
    setVendedorExpandido(vendedorExpandido === id ? null : id);
  };

  const abrirModalReuniao = (vendedor: any) => {
    setVendedorSelecionado(vendedor);
    setModalReuniao(true);
  };

  const fecharModal = () => {
    setModalReuniao(false);
    setVendedorSelecionado(null);
    setDataReuniao("");
    setHoraReuniao("");
    setObservacoes("");
  };

  const agendarReuniao = () => {
    console.log("Reunião agendada:", {
      vendedor: vendedorSelecionado,
      data: dataReuniao,
      hora: horaReuniao,
      observacoes,
    });
    alert(
      `Reunião agendada com ${vendedorSelecionado?.nome} para ${dataReuniao} às ${horaReuniao}`
    );
    fecharModal();
  };

  const totalClientesInativos = vendedores.reduce(
    (acc, v) => acc + v.clientesInativos,
    0
  );
  const totalDebitos = vendedores.reduce((acc, v) => acc + v.debitoTotal, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 mt-8">
      <div className="w-full ">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-3 mb-2">
            <AlertCircle className="text-orange-500" size={28} />
            Gestão de Vendedores
          </h1>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <div className="bg-white rounded-xl border-2 border-slate-200 p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 font-medium text-sm sm:text-base">
                Total de Vendedores
              </span>
              <Users className="text-orange-500" size={22} />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800">
              {vendedores.length}
            </p>
          </div>

          <div className="bg-white rounded-xl border-2 border-orange-200 p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 font-medium text-sm sm:text-base">
                Clientes Inativos
              </span>
              <TrendingDown className="text-orange-500" size={22} />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-orange-600">
              {totalClientesInativos}
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              60+ dias sem compras
            </p>
          </div>

          <div className="bg-white rounded-xl border-2 border-red-200 p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 font-medium text-sm sm:text-base">
                Débitos Totais
              </span>
              <DollarSign className="text-red-500" size={22} />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-red-600">
              R$ {totalDebitos.toLocaleString("pt-BR")}
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Pendentes de pagamento
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl border-2 border-slate-200 p-4 mb-6 shadow-sm flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 flex-1">
            <Search className="text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar vendedor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-br-lg rounded-tl-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex items-center gap-2 sm:w-auto">
            <Filter className="text-slate-400" size={18} />
            <select
              value={filtroDebito}
              onChange={(e) => setFiltroDebito(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-br-lg rounded-tl-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 w-full sm:w-auto"
            >
              <option value="todos">Todos os Débitos</option>
              <option value="alto">Alto (&gt; R$ 25k)</option>
              <option value="medio">Médio (R$ 10k - R$ 25k)</option>
              <option value="baixo">Baixo (&lt; R$ 10k)</option>
            </select>
          </div>
        </div>

        {/* Lista de Vendedores */}
        <div className="space-y-4">
          {vendedoresFiltrados.map((vendedor) => (
            <div
              key={vendedor.id}
              className="bg-white rounded-xl border-2 border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="p-4 sm:p-6 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Info vendedor */}
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-md">
                      <Users className="text-black" size={22} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-800 truncate">
                        {vendedor.nome}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-3 mt-1 text-sm text-slate-600">
                        <span className="flex items-center gap-1 truncate">
                          <Mail size={14} />
                          {vendedor.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone size={14} />
                          {vendedor.telefone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Resumo + Ações */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-3 sm:gap-5 w-full sm:w-auto">
                    <div className="text-center">
                      <p className="text-lg font-bold text-slate-800">
                        {vendedor.totalClientes}
                      </p>
                      <p className="text-xs text-slate-500">Clientes</p>
                    </div>

                    <div className="text-center">
                      <p className="text-lg font-bold text-orange-600">
                        {vendedor.clientesInativos}
                      </p>
                      <p className="text-xs text-slate-500">Inativos</p>
                    </div>

                    <div className="text-center">
                      <p className="text-lg font-bold text-red-600">
                        R$ {(vendedor.debitoTotal / 1000).toFixed(1)}k
                      </p>
                      <p className="text-xs text-slate-500">Débitos</p>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-end">
                      <button
                        onClick={() => abrirModalReuniao(vendedor)}
                        className="flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-2 rounded-br-lg rounded-tl-lg text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-md cursor-pointer"
                      >
                        <Calendar size={16} />
                        <span>Reunião</span>
                      </button>

                      <button
                        onClick={() => toggleVendedor(vendedor.id)}
                        className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        {vendedorExpandido === vendedor.id ? (
                          <ChevronUp size={18} className="text-slate-600" />
                        ) : (
                          <ChevronDown size={18} className="text-slate-600" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detalhes dos Clientes */}
              {vendedorExpandido === vendedor.id && (
                <div className="border-t-2 border-slate-200 bg-slate-50 p-4 sm:p-6">
                  <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <AlertCircle className="text-orange-500" size={18} />
                    Clientes Inativos ({vendedor.clientes.length})
                  </h4>

                  <div className="grid gap-3">
                    {vendedor.clientes.map((cliente) => (
                      <div
                        key={cliente.id}
                        className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div>
                            <h5 className="font-semibold text-slate-800">
                              {cliente.nome}
                            </h5>
                            <p className="text-sm text-slate-600">
                              Contato: {cliente.contato}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                            <div className="text-center">
                              <p className="text-sm font-semibold text-orange-600 flex items-center gap-1">
                                <Clock size={14} />
                                {cliente.ultimaCompra}
                              </p>
                              <p className="text-xs text-slate-500">
                                Sem compras
                              </p>
                            </div>

                            <div className="text-center">
                              <p className="text-sm font-semibold text-red-600 flex items-center gap-1">
                                {/* <DollarSign size={14} /> */}
                                R$ {cliente.debito.toLocaleString("pt-BR")}
                              </p>
                              <p className="text-xs text-slate-500">Débito</p>
                            </div>

                            <button className="flex items-center justify-center gap-1 bg-orange-100 text-orange-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors w-full sm:w-auto">
                              <Phone size={14} />
                              Contatar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {vendedoresFiltrados.length === 0 && (
          <div className="bg-white rounded-xl border-2 border-dashed border-slate-300 p-12 text-center">
            <Users className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              Nenhum vendedor encontrado
            </h3>
            <p className="text-slate-500">Tente ajustar os filtros de busca</p>
          </div>
        )}
      </div>

      {/* Modal de Agendamento */}
      {modalReuniao && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border-2 border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                  Agendar Reunião
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  {vendedorSelecionado?.nome}
                </p>
              </div>
              <button
                onClick={fecharModal}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Data da Reunião
                </label>
                <input
                  type="date"
                  value={dataReuniao}
                  onChange={(e) => setDataReuniao(e.target.value)}
                  className="w-full border-2 border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Horário
                </label>
                <input
                  type="time"
                  value={horaReuniao}
                  onChange={(e) => setHoraReuniao(e.target.value)}
                  className="w-full border-2 border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Observações
                </label>
                <textarea
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Descreva o objetivo da reunião..."
                  className="w-full h-24 border-2 border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={fecharModal}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={agendarReuniao}
                disabled={!dataReuniao || !horaReuniao}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
