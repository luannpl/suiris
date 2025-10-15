"use client";

import type { Meta } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, User } from "lucide-react";

interface MetaCardProps {
  meta: Meta;
  onClick?: () => void;
}

export function MetaCard({ meta, onClick }: MetaCardProps) {
  const progresso =
    meta.vendedorId == "1"
      ? (3 / 6) * 100
      : (meta.valorAtual / meta.valorMeta) * 100;

  const statusColors = {
    pendente: "bg-gray-500",
    em_progresso: "bg-warning",
    concluida: "bg-success",
    nao_concluida: "bg-destructive",
  };

  const statusLabels = {
    pendente: "Pendente",
    em_progresso: "Em Progresso",
    concluida: "Concluída",
    nao_concluida: "Não Concluída",
  };

  return (
    <Card
      className={`p-6 transition-all hover:shadow-md ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">
            {meta.titulo}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{meta.descricao}</p>
        </div>
        <Badge className={`${statusColors[meta.status]} text-white`}>
          {statusLabels[meta.status]}
        </Badge>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progresso</span>
          <span className="font-semibold text-foreground">
            {progresso.toFixed(0)}%
          </span>
        </div>
        <Progress value={progresso} className="h-2" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Atual / Meta</p>
            <p className="text-sm font-semibold text-foreground">
              {meta.vendedorId == "1"
                ? `3 / 6`
                : `${meta.valorAtual} / ${meta.valorMeta}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Data</p>
            <p className="text-sm font-semibold text-foreground">
              {new Date().toLocaleString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Vendedor: {meta.vendedorName}
        </p>
      </div>
    </Card>
  );
}
