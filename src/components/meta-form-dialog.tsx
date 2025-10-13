"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Meta } from "@/lib/types";

interface MetaFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    titulo: string;
    descricao: string;
    valorMeta: number;
    valorAtual: number;
    data: string;
  }) => void;
  meta?: Meta;
  isEdit?: boolean;
}

export function MetaFormDialog({
  open,
  onOpenChange,
  onSubmit,
  meta,
  isEdit,
}: MetaFormDialogProps) {
  const [titulo, setTitulo] = useState(meta?.titulo || "");
  const [descricao, setDescricao] = useState(meta?.descricao || "");
  const [valorMeta, setValorMeta] = useState(meta?.valorMeta.toString() || "");
  const [valorAtual, setValorAtual] = useState(
    meta?.valorAtual.toString() || "0"
  );
  const [data, setData] = useState(
    meta?.data || new Date().toISOString().split("T")[0]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      titulo,
      descricao,
      valorMeta: Number.parseFloat(valorMeta),
      valorAtual: Number.parseFloat(valorAtual),
      data,
    });
    onOpenChange(false);

    // Reset form
    if (!isEdit) {
      setTitulo("");
      setDescricao("");
      setValorMeta("");
      setValorAtual("0");
      setData(new Date().toISOString().split("T")[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar Meta" : "Nova Meta"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Vendas de Café Premium"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva os detalhes da meta..."
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valorMeta">Valor da Meta (R$)</Label>
              <Input
                id="valorMeta"
                type="number"
                value={valorMeta}
                onChange={(e) => setValorMeta(e.target.value)}
                placeholder="50000"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valorAtual">Valor Atual (R$)</Label>
              <Input
                id="valorAtual"
                type="number"
                value={valorAtual}
                onChange={(e) => setValorAtual(e.target.value)}
                placeholder="0"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="data">Data</Label>
            <Input
              id="data"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary-dark">
              {isEdit ? "Salvar" : "Criar Meta"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
