"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getMetasByVendedor, addMeta, updateMeta } from "@/lib/metas";
import type { Meta, User } from "@/lib/types";
import { MetaCard } from "@/components/meta-card";
import { MetaFormDialog } from "@/components/meta-form-dialog";
import { Target } from "lucide-react"; // Import the Target component

export default function VendedorPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [metas, setMetas] = useState<Meta[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMeta, setEditingMeta] = useState<Meta | undefined>();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/");
      return;
    }
    if (currentUser.role !== "vendedor") {
      router.push("/dashboard");
      return;
    }
    setUser(currentUser);
    loadMetas(currentUser.id);
  }, [router]);

  const loadMetas = (vendedorId: string) => {
    const userMetas = getMetasByVendedor(vendedorId);
    setMetas(userMetas);
  };

  const handleAddMeta = (data: {
    titulo: string;
    descricao: string;
    valorMeta: number;
    valorAtual: number;
    data: string;
  }) => {
    if (!user) return;

    if (editingMeta) {
      updateMeta(editingMeta.id, data);
      setEditingMeta(undefined);
    } else {
      addMeta({
        ...data,
        vendedorId: user.id,
        vendedorName: user.name,
        status:
          data.valorAtual >= data.valorMeta
            ? "concluida"
            : data.valorAtual > 0
            ? "em_progresso"
            : "pendente",
      });
    }

    loadMetas(user.id);
  };

  const handleEditMeta = (meta: Meta) => {
    setEditingMeta(meta);
    setDialogOpen(true);
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-background">
      {/* <Sidebar /> */}

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Minhas Metas
              </h1>
              <p className="mt-2 text-muted-foreground">
                Cadastre e acompanhe suas metas diárias
              </p>
            </div>
            <Button
              onClick={() => {
                setEditingMeta(undefined);
                setDialogOpen(true);
              }}
              className="bg-primary hover:bg-primary-dark"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nova Meta
            </Button>
          </div>

          {metas.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center">
              <Target className="mb-4 h-12 w-12 text-muted-foreground" />{" "}
              {/* Use the imported Target component */}
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Nenhuma meta cadastrada
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Comece criando sua primeira meta
              </p>
              <Button
                onClick={() => setDialogOpen(true)}
                className="bg-primary hover:bg-primary-dark"
              >
                <Plus className="mr-2 h-4 w-4" />
                Criar Meta
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {metas.map((meta) => (
                <MetaCard
                  key={meta.id}
                  meta={meta}
                  onClick={() => handleEditMeta(meta)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <MetaFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleAddMeta}
        meta={editingMeta}
        isEdit={!!editingMeta}
      />
    </div>
  );
}
