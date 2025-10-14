"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cliente } from "@/lib/types";

interface ClienteFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    nomeRazaoSocial: string;
    email: string;
    telefone: string;
    endereco: string;
    dataUltimaCompra: string | null;
    inadimplente: boolean;
    valorDebitoTotal: number;
  }) => void;
  cliente?: Cliente;
  isEdit?: boolean;
}

export function ClienteFormDialog({
  open,
  onOpenChange,
  onSubmit,
  cliente,
  isEdit = false,
}: ClienteFormDialogProps) {
  const [formData, setFormData] = useState({
    nomeRazaoSocial: "",
    email: "",
    telefone: "",
    endereco: "",
    dataUltimaCompra: "",
    inadimplente: false,
    valorDebitoTotal: 0,
  });
  // Estado de exibição formatada para o campo de valor (moeda)
  const [valorDebitoTotalInput, setValorDebitoTotalInput] = useState("");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  useEffect(() => {
    if (cliente && isEdit) {
      setFormData({
        nomeRazaoSocial: cliente.nomeRazaoSocial,
        email: cliente.email,
        telefone: cliente.telefone,
        endereco: cliente.endereco,
        dataUltimaCompra: cliente.dataUltimaCompra || "",
        inadimplente: cliente.inadimplente,
        valorDebitoTotal: cliente.valorDebitoTotal,
      });
      setValorDebitoTotalInput(formatCurrency(cliente.valorDebitoTotal || 0));
    } else {
      setFormData({
        nomeRazaoSocial: "",
        email: "",
        telefone: "",
        endereco: "",
        dataUltimaCompra: "",
        inadimplente: false,
        valorDebitoTotal: 0,
      });
      setValorDebitoTotalInput(formatCurrency(0));
    }
  }, [cliente, isEdit, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      dataUltimaCompra: formData.dataUltimaCompra || null,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar Cliente" : "Novo Cliente"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nomeRazaoSocial">Nome/Razão Social *</Label>
              <Input
                id="nomeRazaoSocial"
                value={formData.nomeRazaoSocial}
                onChange={(e) =>
                  setFormData({ ...formData, nomeRazaoSocial: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone *</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) =>
                  setFormData({ ...formData, telefone: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataUltimaCompra">Data da Última Compra</Label>
              <Input
                id="dataUltimaCompra"
                type="date"
                value={formData.dataUltimaCompra}
                onChange={(e) =>
                  setFormData({ ...formData, dataUltimaCompra: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço *</Label>
            <Input
              id="endereco"
              value={formData.endereco}
              onChange={(e) =>
                setFormData({ ...formData, endereco: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valorDebitoTotal">Valor Débito Total (R$)</Label>
              <Input
                id="valorDebitoTotal"
                type="text"
                // step="0.01"
                // min="0"
                value={valorDebitoTotalInput}
                onChange={(e) => {
                  const raw = e.target.value;
                  // Mantém apenas dígitos para converter em centavos
                  const digitsOnly = raw.replace(/\D/g, "");
                  const cents = digitsOnly ? parseInt(digitsOnly, 10) : 0;
                  const value = cents / 100; // converte para reais

                  setFormData({
                    ...formData,
                    valorDebitoTotal: value,
                    inadimplente: value > 0,
                  });
                  setValorDebitoTotalInput(formatCurrency(value));
                }}
              />
            </div>

            <div className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                id="inadimplente"
                checked={formData.inadimplente}
                onChange={(e) =>
                  setFormData({ ...formData, inadimplente: e.target.checked })
                }
                className="rounded border-input"
              />
              <Label htmlFor="inadimplente">Cliente Inadimplente</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary-dark">
              {isEdit ? "Salvar Alterações" : "Criar Cliente"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
