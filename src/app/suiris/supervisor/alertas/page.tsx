"use client";
import React, { useState } from "react";
import {
  Bell,
  AlertTriangle,
  TrendingDown,
  Calendar,
  CheckCircle,
  X,
  Filter,
  Search,
  Users,
  Target,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function AlertasDashboard() {
  const [filtroAtivo, setFiltroAtivo] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [alertasAgendados, setAlertasAgendados] = useState<{
    [key: number]: boolean;
  }>({});

  const alertas = [
    {
      id: 1,
      tipo: "performance",
      prioridade: "alta",
      vendedor: "João Silva",
      titulo: "Meta mensal em risco",
      descricao: "Apenas 45% da meta atingida com 10 dias restantes",
      metrica: "45% da meta",
      prazo: "10 dias restantes",
      sugestoes: [
        "Revisar pipeline de oportunidades",
        "Agendar reunião 1:1 de acompanhamento",
        "Realocar leads quentes",
      ],
      timestamp: "2h atrás",
      lido: false,
    },
    {
      id: 2,
      tipo: "atividade",
      prioridade: "média",
      vendedor: "Maria Santos",
      titulo: "Baixa atividade nos últimos 3 dias",
      descricao: "Apenas 8 visitas realizadas (média esperada: 25)",
      metrica: "8 visitas",
      prazo: "Últimos 3 dias",
      sugestoes: [
        "Verificar se há bloqueios ou dificuldades",
        "Oferecer suporte com gestão de tempo",
        "Revisar qualidade vs quantidade",
      ],
      timestamp: "5h atrás",
      lido: false,
    },
    {
      id: 3,
      tipo: "conversao",
      prioridade: "alta",
      vendedor: "Pedro Oliveira",
      titulo: "Taxa de conversão em queda",
      descricao: "Conversão caiu de 35% para 18% no último mês",
      metrica: "18% conversão",
      prazo: "Tendência mensal",
      sugestoes: [
        "Analisar gravações de calls recentes",
        "Sessão de treinamento em objeções",
        "Revisar qualificação de leads",
      ],
      timestamp: "1 dia atrás",
      lido: false,
    },
    {
      id: 4,
      tipo: "urgente",
      prioridade: "crítica",
      vendedor: "Ana Costa",
      titulo: "Cliente de alto valor em risco",
      descricao: "Conta Premium sem contato há 65 dias",
      metrica: "R$ 45k",
      prazo: "65 dias sem contato",
      sugestoes: [
        "Contato imediato com cliente",
        "Oferecer reunião de alinhamento",
        "Considerar envolvimento de Account Manager",
      ],
      timestamp: "30min atrás",
      lido: false,
    },
    {
      id: 5,
      tipo: "performance",
      prioridade: "baixa",
      vendedor: "Carlos Mendes",
      titulo: "Oportunidade de reconhecimento",
      descricao: "Superou meta em 150% nos últimos 7 dias",
      metrica: "150% da meta",
      prazo: "Últimos 7 dias",
      sugestoes: [
        "Reconhecer publicamente a conquista",
        "Solicitar compartilhamento de práticas",
        "Considerar para programa de mentoria",
      ],
      timestamp: "3h atrás",
      lido: false,
    },
  ];

  const getPrioridadeColor = (prioridade: any) => {
    const colors = {
      crítica: "bg-red-100 text-red-700 border-red-300",
      alta: "bg-orange-100 text-orange-700 border-orange-300",
      média: "bg-yellow-100 text-yellow-700 border-yellow-300",
      baixa: "bg-blue-100 text-blue-700 border-blue-300",
    };
    return colors[prioridade as keyof typeof colors] || colors.média;
  };

  const getTipoIcon = (tipo: any) => {
    const icons = {
      performance: TrendingDown,
      atividade: Clock,
      conversao: Target,
      urgente: AlertTriangle,
    };
    return icons[tipo as keyof typeof icons] || Bell;
  };

  const agendar = (alertaId: number) => {
    setAlertasAgendados((prev) => ({ ...prev, [alertaId]: true }));
  };

  const alertasFiltrados = alertas.filter((alerta) => {
    const matchFiltro =
      filtroAtivo === "todos" ||
      alerta.prioridade === filtroAtivo ||
      (filtroAtivo === "nao-lidos" && !alerta.lido);
    const matchSearch =
      alerta.vendedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alerta.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFiltro && matchSearch;
  });

  const alertasNaoLidos = alertas.filter((a) => !a.lido).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 mt-8">
      <div className="w-full">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2 md:gap-3">
                <Bell className="text-orange-500" size={28} />
                Alertas e Ações
              </h1>
              <p className="text-sm md:text-base text-slate-600 mt-1">
                Central de notificações e sugestões de intervenção
              </p>
            </div>
            <div className="flex items-center gap-2 bg-orange-100 px-3 md:px-4 py-2 rounded-lg border border-orange-300">
              <AlertTriangle className="text-orange-600" size={18} />
              <span className="text-sm md:text-base font-semibold text-orange-700">
                {alertasNaoLidos} não lidos
              </span>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}

        {/* Filtros e Busca */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 md:p-4 mb-4 md:mb-6">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 md:gap-4">
            <div className="flex items-center gap-2 flex-1 overflow-x-auto">
              <Filter className="text-slate-400 flex-shrink-0" size={20} />
              <div className="flex gap-2 min-w-max">
                {["todos", "crítica", "alta", "média"].map((filtro) => (
                  <button
                    key={filtro}
                    onClick={() => setFiltroAtivo(filtro)}
                    className={`px-3 md:px-4 py-2 rounded-br-lg rounded-tl-lg font-medium text-sm transition-all whitespace-nowrap ${
                      filtroAtivo === filtro
                        ? "bg-orange-500 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {filtro.charAt(0).toUpperCase() +
                      filtro.slice(1).replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative w-full lg:w-80">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar vendedor ou alerta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-full text-sm md:text-base"
              />
            </div>
          </div>
        </div>

        {/* Lista de Alertas */}
        <div className="space-y-4">
          {alertasFiltrados.map((alerta) => {
            const IconeTipo = getTipoIcon(alerta.tipo);
            return (
              <div
                key={alerta.id}
                className={`bg-white rounded-xl border-2 p-4 md:p-6 transition-all hover:shadow-lg ${
                  alerta.lido
                    ? "border-slate-200"
                    : alertasAgendados[alerta.id]
                    ? "border-yellow-400 bg-yellow-50/30"
                    : "border-orange-200 bg-orange-50/30"
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                  {/* Ícone e Prioridade */}
                  <div className="flex sm:flex-col items-center sm:items-center gap-2 sm:gap-2">
                    <div
                      className={`p-2 md:p-3 rounded-xl border-2 ${getPrioridadeColor(
                        alerta.prioridade
                      )}`}
                    >
                      <IconeTipo size={20} className="md:w-6 md:h-6" />
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${getPrioridadeColor(
                        alerta.prioridade
                      )}`}
                    >
                      {alerta.prioridade.toUpperCase()}
                    </span>
                    <span className="text-xs sm:hidden text-slate-500 ml-auto">
                      {alerta.timestamp}
                    </span>
                  </div>

                  {/* Conteúdo Principal */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-lg md:text-xl font-bold text-slate-800">
                            {alerta.titulo}
                          </h3>
                          {!alerta.lido && (
                            <span className="bg-orange-500 w-2 h-2 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm md:text-base text-slate-600 font-medium">
                          {alerta.vendedor}
                        </p>
                      </div>
                      <span className="hidden sm:block text-sm text-slate-500 ml-2">
                        {alerta.timestamp}
                      </span>
                    </div>

                    <p className="text-sm md:text-base text-slate-700 mb-4">
                      {alerta.descricao}
                    </p>

                    <div className="flex flex-wrap gap-2 md:gap-4 mb-4">
                      <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg">
                        <Target size={16} className="text-slate-600" />
                        <span className="text-xs md:text-sm font-medium text-slate-700">
                          {alerta.metrica}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg">
                        <Clock size={16} className="text-slate-600" />
                        <span className="text-xs md:text-sm font-medium text-slate-700">
                          {alerta.prazo}
                        </span>
                      </div>
                    </div>

                    {/* Sugestões de Ação */}
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-3 md:p-4 border border-orange-200">
                      <h4 className="text-sm md:text-base font-semibold text-slate-800 mb-2 flex items-center gap-2">
                        <CheckCircle
                          size={18}
                          className="text-orange-500 flex-shrink-0"
                        />
                        Sugestões de Ação - Clara AI
                      </h4>
                      <ul className="space-y-2">
                        {alerta.sugestoes.map((sugestao, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs md:text-sm text-slate-700"
                          >
                            <ArrowRight
                              size={16}
                              className="text-orange-500 flex-shrink-0 mt-0.5"
                            />
                            <span>{sugestao}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-4">
                      <button
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-br-lg rounded-tl-lg font-medium text-sm transition-colors ${
                          alertasAgendados[alerta.id]
                            ? "bg-yellow-500 text-white hover:bg-yellow-600"
                            : "bg-orange-500 text-white hover:bg-orange-600"
                        }`}
                        disabled={alertasAgendados[alerta.id]}
                        onClick={() => agendar(alerta.id)}
                      >
                        <CheckCircle size={18} />
                        {alertasAgendados[alerta.id]
                          ? "Vespertina Agendada"
                          : "Agendar Vespertina"}
                      </button>
                      <button className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-slate-200 transition-colors">
                        <X size={18} />
                        Dispensar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {alertasFiltrados.length === 0 && (
          <div className="bg-white rounded-xl border-2 border-dashed border-slate-300 p-8 md:p-12 text-center">
            <Bell className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-lg md:text-xl font-semibold text-slate-600 mb-2">
              Nenhum alerta encontrado
            </h3>
            <p className="text-sm md:text-base text-slate-500">
              Tente ajustar os filtros ou busca
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
