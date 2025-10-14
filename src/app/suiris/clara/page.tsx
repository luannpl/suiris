"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Lightbulb, Sparkles } from "lucide-react";

export default function ChatbotVendas() {
  const [mensagens, setMensagens] = useState<
    Array<{
      id: number;
      tipo: string;
      texto: string;
      timestamp: string;
      sugestoes?: string[];
      insights?: string[];
    }>
  >([
    {
      id: 1,
      tipo: "bot",
      texto: "Olá! Sou a Clara AI. Como posso ajudar você hoje?",
      timestamp: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      insights: [
        "Experimente perguntar sobre metas ou desempenho",
        "Peça dicas de prospecção",
      ],
      sugestoes: ["Resumir minhas metas", "Analisar meu desempenho"],
    },
  ]);

  const [inputTexto, setInputTexto] = useState("");
  const [digitando, setDigitando] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll automático ao final
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  // Função principal de envio
  const enviarMensagem = async (texto: string) => {
    if (!texto.trim()) return;

    const novaMensagem = {
      id: mensagens.length + 1,
      tipo: "usuario",
      texto,
      timestamp: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Adiciona mensagem do usuário
    setMensagens((prev) => [...prev, novaMensagem]);
    setInputTexto("");
    setDigitando(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: texto }),
      });

      if (!response.ok) throw new Error(`Erro na API: ${response.status}`);

      const data = await response.text();

      // Adiciona resposta do bot
      const respostaBot = {
        id: mensagens.length + 2,
        tipo: "bot",
        texto: data,
        timestamp: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMensagens((prev) => [...prev, respostaBot]);
    } catch (error) {
      console.error(error);

      const erroMsg = {
        id: mensagens.length + 2,
        tipo: "bot",
        texto: "⚠️ Ocorreu um erro ao se conectar com o servidor.",
        timestamp: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMensagens((prev) => [...prev, erroMsg]);
    } finally {
      setDigitando(false);
    }
  };

  const handleSugestaoClick = (sugestao: string) => {
    enviarMensagem(sugestao);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-6 py-3 md:py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="text-white" size={20} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h1 className="text-base md:text-xl font-bold text-slate-800 flex items-center gap-1 md:gap-2">
              Clara AI
              <Sparkles className="text-orange-500 flex-shrink-0" size={16} />
            </h1>
            <p className="text-xs md:text-sm text-slate-600">
              Online • Respondendo instantaneamente
            </p>
          </div>
        </div>
      </div>

      {/* Área do Chat */}
      <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4 md:py-6">
        <div className="w-full space-y-4 md:space-y-6">
          {mensagens.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2 md:gap-3 ${
                msg.tipo === "usuario" ? "flex-row-reverse" : ""
              }`}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center ${
                  msg.tipo === "bot"
                    ? "bg-gradient-to-br from-orange-400 to-orange-600"
                    : "bg-gradient-to-br from-slate-400 to-slate-600"
                }`}
              >
                {msg.tipo === "bot" ? (
                  <Bot className="text-white" size={16} />
                ) : (
                  <User className="text-white" size={16} />
                )}
              </div>

              {/* Mensagem */}
              <div
                className={`flex-1 min-w-0 ${
                  msg.tipo === "usuario" ? "flex justify-end" : ""
                }`}
              >
                <div
                  className={`max-w-full md:max-w-3xl ${
                    msg.tipo === "usuario"
                      ? "bg-orange-500 text-white"
                      : "bg-white border border-slate-200"
                  } rounded-2xl p-3 md:p-4 shadow-sm`}
                >
                  <p
                    className={`whitespace-pre-line text-sm md:text-base ${
                      msg.tipo === "usuario" ? "text-white" : "text-slate-800"
                    }`}
                  >
                    {msg.texto}
                  </p>

                  {/* Insights */}
                  {msg.insights && msg.insights.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-orange-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb
                          className="text-orange-500 flex-shrink-0"
                          size={16}
                        />
                        <span className="text-xs font-semibold text-slate-700">
                          Insights
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {msg.insights.map((insight, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-slate-600 flex items-start gap-2"
                          >
                            <span className="text-orange-500 mt-1">•</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Sugestões */}
                  {msg.sugestoes && msg.sugestoes.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.sugestoes.map((sugestao, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSugestaoClick(sugestao)}
                          className="px-2.5 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-xs font-medium hover:bg-orange-100 transition-colors border border-orange-200"
                        >
                          {sugestao}
                        </button>
                      ))}
                    </div>
                  )}

                  <span
                    className={`text-xs mt-2 block ${
                      msg.tipo === "usuario"
                        ? "text-orange-100"
                        : "text-slate-500"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Digitando */}
          {digitando && (
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <Bot className="text-white" size={16} />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-slate-200 px-3 md:px-6 py-3 md:py-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-slate-100 rounded-2xl border-2 border-slate-200 focus-within:border-orange-400 flex items-center">
            <textarea
              value={inputTexto}
              onChange={(e) => setInputTexto(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  enviarMensagem(inputTexto);
                }
              }}
              placeholder="Digite sua mensagem..."
              className="w-full bg-transparent px-4 py-3 outline-none resize-none text-sm text-slate-800 placeholder-slate-500"
              rows={1}
              style={{ maxHeight: "120px" }}
            />
          </div>

          <button
            onClick={() => enviarMensagem(inputTexto)}
            disabled={!inputTexto.trim()}
            className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            <Send className="text-white" size={18} />
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2 text-center hidden sm:block">
          Pressione Enter para enviar • Shift + Enter para quebrar linha
        </p>
      </div>
    </div>
  );
}
