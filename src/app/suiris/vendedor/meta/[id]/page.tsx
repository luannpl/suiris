"use client";
import React, { useState } from "react";
import {
  Target,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  X,
  Save,
  Edit2,
  User,
  Building,
  DollarSign,
} from "lucide-react";

// You would typically define these types in a separate file
type PotencialCliente = "alto" | "medio" | "baixo";
type StatusVisita = "visitado" | "pendente";

interface ClienteVisita {
  id: number;
  nome: string;
  contato: string;
  cargo: string;
  telefone: string;
  email: string;
  endereco: string;
  status: StatusVisita;
  dataVisita?: string;
  resultado?: string;
  proximoPasso?: string;
  valorNegociado?: number;
  potencial?: PotencialCliente;
}

export default function ControleVisitas() {
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [modalVisita, setModalVisita] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] =
    useState<ClienteVisita | null>(null);
  const [dataVisita, setDataVisita] = useState("");
  const [resultado, setResultado] = useState("");
  const [proximoPasso, setProximoPasso] = useState("");
  const [valorNegociado, setValorNegociado] = useState("");

  const [clientes, setClientes] = useState<ClienteVisita[]>([
    {
      id: 1,
      nome: "Mercantil São José",
      contato: "Carlos Albuquerque",
      cargo: "Gerente de Compras",
      telefone: "(85) 98765-4321",
      email: "carlos@mercantilsaojose.com",
      endereco: "Av. Santos Dumont, 1450 - Aldeota",
      status: "visitado",
      dataVisita: "2024-10-10",
      resultado:
        "Apresentação do portfólio de cafés 3 Corações. Cliente demonstrou interesse em linha gourmet.",
      proximoPasso: "Enviar tabela de preços e amostras até 15/10",
      valorNegociado: 12500,
      potencial: "alto",
    },
    {
      id: 2,
      nome: "Supermercado Bom Café",
      contato: "Maria Souza",
      cargo: "Proprietária",
      telefone: "(85) 98888-7777",
      email: "maria@bomcafe.com",
      endereco: "Rua Barão de Studart, 456 - Meireles",
      status: "visitado",
      dataVisita: "2024-10-11",
      resultado:
        "Cliente já trabalha com concorrentes. Solicitou proposta para linha tradicional.",
      proximoPasso: "Agendar degustação com equipe comercial",
      valorNegociado: 7200,
      potencial: "medio",
    },
    {
      id: 3,
      nome: "Café do Ponto Comercial",
      contato: "Pedro Oliveira",
      cargo: "Gerente de Operações",
      telefone: "(85) 99999-1234",
      email: "pedro@cafedoponto.com",
      endereco: "Av. Beira Mar, 789 - Praia de Iracema",
      status: "pendente",
      potencial: "alto",
    },
    {
      id: 4,
      nome: "Mercantil São Luís",
      contato: "Ana Costa",
      cargo: "Supervisora de Compras",
      telefone: "(85) 97777-5555",
      email: "ana@mercantilluis.com",
      endereco: "Rua Major Facundo, 321 - Centro",
      status: "pendente",
      potencial: "medio",
    },
    {
      id: 5,
      nome: "Empório Grãos do Sertão",
      contato: "Roberto Silva",
      cargo: "Diretor Comercial",
      telefone: "(85) 96666-4444",
      email: "roberto@graosdosertao.com",
      endereco: "Av. Dom Luís, 567 - Meireles",
      status: "visitado",
      dataVisita: "2024-10-12",
      resultado:
        "Cliente gostou da linha cápsulas e pediu proposta para revenda local.",
      proximoPasso: "Enviar contrato de parceria até 18/10",
      valorNegociado: 10500,
      potencial: "alto",
    },
    {
      id: 6,
      nome: "Mercantil Café Norte",
      contato: "Julia Mendes",
      cargo: "Gerente Geral",
      telefone: "(85) 95555-3333",
      email: "julia@cafénorte.com",
      endereco: "Rua Silva Paulet, 890 - Aldeota",
      status: "pendente",
      potencial: "alto",
    },
  ]);

  const clientesVisitados = clientes.filter(
    (c) => c.status === "visitado"
  ).length;
  const clientesPendentes = clientes.filter(
    (c) => c.status === "pendente"
  ).length;
  const metaVisitas = clientes.length;
  const progressoPercentual = Math.round(
    (clientesVisitados / metaVisitas) * 100
  );
  const valorTotalNegociado = clientes.reduce(
    (acc, c) => acc + (c.valorNegociado || 0),
    0
  );

  const clientesFiltrados = clientes.filter((c) => {
    if (filtroStatus === "todos") return true;
    return c.status === filtroStatus;
  });

  const abrirModalVisita = (cliente: ClienteVisita) => {
    setClienteSelecionado(cliente);
    setDataVisita(cliente.dataVisita || "");
    setResultado(cliente.resultado || "");
    setProximoPasso(cliente.proximoPasso || "");
    setValorNegociado(
      Number(cliente.valorNegociado) || 0 ? String(cliente.valorNegociado) : ""
    );
    setModalVisita(true);
  };

  const fecharModal = () => {
    setModalVisita(false);
    setClienteSelecionado(null);
    setDataVisita("");
    setResultado("");
    setProximoPasso("");
    setValorNegociado("");
  };

  const salvarVisita = () => {
    if (!clienteSelecionado) return;
    setClientes(
      clientes.map((c) => {
        if (c.id === clienteSelecionado.id) {
          return {
            ...c,
            status: "visitado",
            dataVisita,
            resultado,
            proximoPasso,
            valorNegociado: parseFloat(valorNegociado) || 0,
          };
        }
        return c;
      })
    );
    fecharModal();
  };

  const getPotencialColor = (potencial?: PotencialCliente) => {
    if (!potencial) return "bg-slate-100 text-slate-700 border-slate-300";
    const colors = {
      alto: "bg-green-100 text-green-700 border-green-300",
      medio: "bg-yellow-100 text-yellow-700 border-yellow-300",
      baixo: "bg-slate-100 text-slate-700 border-slate-300",
    };
    return colors[potencial] || colors.medio;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 font-sans">
      <div className="w-full  mt-8 sm:mt-0">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                Controle de Visitas -{" "}
                {new Date().toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </h1>
              <p className="mt-1 text-sm sm:text-base text-slate-500">
                Gerencie suas visitas e acompanhe o progresso da meta.
              </p>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="bg-white rounded-xl border-2 border-slate-200 p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-slate-700">
                Progresso da Meta de Visitas
              </span>
              <span className="text-xl sm:text-2xl font-bold text-orange-600">
                {progressoPercentual}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-4 mb-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                style={{ width: `${progressoPercentual}%` }}
              >
                {progressoPercentual > 10 && (
                  <span className="text-xs font-bold text-white">
                    {clientesVisitados}/{metaVisitas}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-slate-600">
              <span>{clientesVisitados} visitas realizadas</span>
              <span>{clientesPendentes} visitas pendentes</span>
            </div>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border-2 border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 font-medium text-sm">Total</span>
              <Target className="text-slate-400" size={20} />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800">
              {metaVisitas}
            </p>
            <p className="text-xs text-slate-500 mt-1">Clientes</p>
          </div>

          <div className="bg-white rounded-xl border-2 border-green-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 font-medium text-sm">
                Visitados
              </span>
              <CheckCircle className="text-green-500" size={20} />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">
              {clientesVisitados}
            </p>
            <p className="text-xs text-slate-500 mt-1">Concluídos</p>
          </div>

          <div className="bg-white rounded-xl border-2 border-orange-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 font-medium text-sm">
                Pendentes
              </span>
              <Clock className="text-orange-500" size={20} />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-orange-600">
              {clientesPendentes}
            </p>
            <p className="text-xs text-slate-500 mt-1">A realizar</p>
          </div>

          <div className="bg-white rounded-xl border-2 border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 font-medium text-sm">
                Negociado
              </span>
              <DollarSign className="text-green-500" size={20} />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-green-600">
              R$ {(valorTotalNegociado / 1000).toFixed(1).replace(".", ",")}k
            </p>
            <p className="text-xs text-slate-500 mt-1">Total</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl border-2 border-slate-200 p-4 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="text-sm font-medium text-slate-700 shrink-0">
              Filtrar por:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { value: "todos", label: "Todos", count: clientes.length },
                {
                  value: "visitado",
                  label: "Visitados",
                  count: clientesVisitados,
                },
                {
                  value: "pendente",
                  label: "Pendentes",
                  count: clientesPendentes,
                },
              ].map((filtro) => (
                <button
                  key={filtro.value}
                  onClick={() => setFiltroStatus(filtro.value)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    filtroStatus === filtro.value
                      ? "bg-orange-500 text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {filtro.label} ({filtro.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de Clientes */}
        <div className="grid gap-4">
          {clientesFiltrados.map((cliente) => (
            <div
              key={cliente.id}
              className={`bg-white rounded-xl border-2 p-4 sm:p-6 shadow-sm transition-all hover:shadow-lg hover:border-orange-300 ${
                cliente.status === "visitado"
                  ? "border-green-200 bg-green-50/30"
                  : "border-slate-200"
              }`}
            >
              <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                {/* Info do Cliente */}
                <div className="flex gap-4 flex-1 w-full">
                  <div
                    className={`hidden sm:flex w-16 h-16 rounded-xl items-center justify-center shadow-md shrink-0 ${
                      cliente.status === "visitado"
                        ? "bg-gradient-to-br from-green-400 to-green-600"
                        : "bg-gradient-to-br from-orange-400 to-orange-600"
                    }`}
                  >
                    {cliente.status === "visitado" ? (
                      <CheckCircle className="text-white" size={28} />
                    ) : (
                      <Clock className="text-white" size={28} />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                        {cliente.nome}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border w-fit ${getPotencialColor(
                          cliente.potencial
                        )}`}
                      >
                        {cliente.potencial?.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-3 mb-3 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-slate-400 shrink-0" />
                        <span>
                          <strong>{cliente.contato}</strong> ({cliente.cargo})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-slate-400 shrink-0" />
                        {cliente.telefone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-slate-400 shrink-0" />
                        {cliente.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-slate-400 shrink-0" />
                        {cliente.endereco}
                      </div>
                    </div>

                    {/* Detalhes da Visita */}
                    {cliente.status === "visitado" && (
                      <div className="bg-slate-50 rounded-lg p-4 mt-4 border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={16} className="text-orange-500" />
                          <span className="text-sm font-semibold text-slate-700">
                            Visita realizada em{" "}
                            {new Date(
                              cliente.dataVisita + "T00:00:00"
                            ).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 mb-2">
                          <strong>Resultado:</strong> {cliente.resultado}
                        </p>
                        <p className="text-sm text-slate-700 mb-2">
                          <strong>Próximo Passo:</strong> {cliente.proximoPasso}
                        </p>
                        {cliente.valorNegociado &&
                          cliente.valorNegociado > 0 && (
                            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200">
                              <TrendingUp
                                className="text-green-500"
                                size={16}
                              />
                              <span className="text-sm font-semibold text-green-600">
                                Valor Negociado: R${" "}
                                {cliente.valorNegociado.toLocaleString(
                                  "pt-BR",
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }
                                )}
                              </span>
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Ações */}
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <button
                    onClick={() => abrirModalVisita(cliente)}
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-br-lg rounded-tl-lg font-medium transition-all shadow-md text-sm cursor-pointer ${
                      cliente.status === "visitado"
                        ? "bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-100"
                        : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
                    }`}
                  >
                    {cliente.status === "visitado" ? (
                      <>
                        <Edit2 size={16} />
                        Editar Registro
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} />
                        Registrar Visita
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {clientesFiltrados.length === 0 && (
          <div className="bg-white rounded-xl border-2 border-dashed border-slate-300 p-12 text-center">
            <Target className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              Nenhum cliente encontrado
            </h3>
            <p className="text-slate-500">
              Tente ajustar os filtros para encontrar o que procura.
            </p>
          </div>
        )}
      </div>

      {/* Modal de Registro de Visita */}
      {modalVisita && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border-2 border-slate-200 max-h-[90vh] flex flex-col">
            <div className="sticky top-0 bg-white border-b-2 border-slate-200 p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <Building className="text-orange-500" />
                    <span>
                      Registrar Visita:{" "}
                      <span className="font-extrabold">
                        {clienteSelecionado?.nome}
                      </span>
                    </span>
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    {clienteSelecionado?.contato} - {clienteSelecionado?.cargo}
                  </p>
                </div>
                <button
                  onClick={fecharModal}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto">
              <div>
                <label
                  htmlFor="dataVisita"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Data da Visita *
                </label>
                <input
                  id="dataVisita"
                  type="date"
                  value={dataVisita}
                  onChange={(e) => setDataVisita(e.target.value)}
                  className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label
                  htmlFor="resultado"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Resultado da Visita *
                </label>
                <textarea
                  id="resultado"
                  value={resultado}
                  onChange={(e) => setResultado(e.target.value)}
                  placeholder="Descreva o que aconteceu na visita, reações do cliente, objeções levantadas..."
                  className="w-full h-32 border-2 border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 resize-y"
                />
              </div>

              <div>
                <label
                  htmlFor="proximoPasso"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Próximo Passo *
                </label>
                <textarea
                  id="proximoPasso"
                  value={proximoPasso}
                  onChange={(e) => setProximoPasso(e.target.value)}
                  placeholder="Qual é o próximo passo? Ex: Enviar proposta, agendar demo, follow-up..."
                  className="w-full h-24 border-2 border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 resize-y"
                />
              </div>

              <div>
                <label
                  htmlFor="valorNegociado"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Valor Negociado (R$)
                </label>
                <input
                  id="valorNegociado"
                  type="number"
                  value={valorNegociado}
                  onChange={(e) => setValorNegociado(e.target.value)}
                  placeholder="0,00"
                  step="0.01"
                  min="0"
                  className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-slate-50 border-t-2 border-slate-200 p-6 rounded-b-2xl mt-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={fecharModal}
                  className="w-full sm:w-auto flex-1 px-6 py-3 text-sm font-medium text-slate-700 bg-white border-2 border-slate-200 rounded-br-lg rounded-tl-lg hover:bg-slate-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={salvarVisita}
                  disabled={!dataVisita || !resultado || !proximoPasso}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600  hover:from-orange-600 hover:to-orange-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed rounded-br-lg rounded-tl-lg cursor-pointer"
                >
                  <Save size={18} />
                  Salvar Visita
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
