"use client";

import type { Meta } from "./types";

const METAS_KEY = "sales_platform_metas";

export function initializeMetas() {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(METAS_KEY);
  if (!stored) {
    const defaultMetas: Meta[] = [
      {
        id: "1",
        vendedorId: "1",
        vendedorName: "João Silva",
        titulo: "Vendas de Café Premium",
        descricao: "Meta de vendas do café premium linha especial",
        valorMeta: 6,
        valorAtual: 3,
        data: new Date().toISOString().split("T")[0],
        status: "em_progresso",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        vendedorId: "2",
        vendedorName: "Maria Santos",
        titulo: "Novos Clientes",
        descricao: "Captação de novos clientes no setor corporativo",
        valorMeta: 20,
        valorAtual: 20,
        data: new Date().toISOString().split("T")[0],
        status: "concluida",
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        vendedorId: "3",
        vendedorName: "Beatriz Lima",
        titulo: "Cappuccino Vendas",
        descricao: "Meta de vendas do Cappuccino 3 Corações",
        valorMeta: 16,
        valorAtual: 16,
        data: new Date().toISOString().split("T")[0],
        status: "concluida",
        createdAt: new Date().toISOString(),
      },
      {
        id: "4",
        vendedorId: "5",
        vendedorName: "Paulo Luan",
        titulo: "Vendas de Café Premium",
        descricao: "Meta de vendas do café premium linha especial",
        valorMeta: 6,
        valorAtual: 3,
        data: new Date().toISOString().split("T")[0],
        status: "em_progresso",
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(METAS_KEY, JSON.stringify(defaultMetas));
  }
}

export function getMetas(): Meta[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(METAS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function getMetasByVendedor(vendedorId: string): Meta[] {
  return getMetas().filter((meta) => meta.vendedorId === vendedorId);
}

export function addMeta(meta: Omit<Meta, "id" | "createdAt">): Meta {
  const metas = getMetas();
  const newMeta: Meta = {
    ...meta,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  metas.push(newMeta);
  localStorage.setItem(METAS_KEY, JSON.stringify(metas));
  return newMeta;
}

export function updateMeta(id: string, updates: Partial<Meta>): Meta | null {
  const metas = getMetas();
  const index = metas.findIndex((m) => m.id === id);

  if (index === -1) return null;

  metas[index] = { ...metas[index], ...updates };

  // Atualizar status baseado no progresso
  const progresso = (metas[index].valorAtual / metas[index].valorMeta) * 100;
  if (progresso >= 100) {
    metas[index].status = "concluida";
  } else if (progresso > 0) {
    metas[index].status = "em_progresso";
  }

  localStorage.setItem(METAS_KEY, JSON.stringify(metas));
  return metas[index];
}

export function deleteMeta(id: string): boolean {
  const metas = getMetas();
  const filtered = metas.filter((m) => m.id !== id);

  if (filtered.length === metas.length) return false;

  localStorage.setItem(METAS_KEY, JSON.stringify(filtered));
  return true;
}

export function getRanking(): Array<{
  vendedorId: string;
  vendedorName: string;
  metasConcluidas: number;
  totalMetas: number;
  percentual: number;
}> {
  const metas = getMetas();
  const vendedores = new Map<
    string,
    { name: string; concluidas: number; total: number }
  >();

  metas.forEach((meta) => {
    if (!vendedores.has(meta.vendedorId)) {
      vendedores.set(meta.vendedorId, {
        name: meta.vendedorName,
        concluidas: 0,
        total: 0,
      });
    }

    const vendedor = vendedores.get(meta.vendedorId)!;
    vendedor.total++;
    if (meta.status === "concluida") {
      vendedor.concluidas++;
    }
  });

  return Array.from(vendedores.entries())
    .map(([id, data]) => ({
      vendedorId: id,
      vendedorName: data.name,
      metasConcluidas: data.concluidas,
      totalMetas: data.total,
      percentual: data.total > 0 ? (data.concluidas / data.total) * 100 : 0,
    }))
    .sort((a, b) => b.metasConcluidas - a.metasConcluidas);
}
