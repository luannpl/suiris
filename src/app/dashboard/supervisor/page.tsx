"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Sidebar } from "@/components/sidebar";
import { getMetas, updateMeta } from "@/lib/metas";
import type { Meta, User } from "@/lib/types";
import { MetaCard } from "@/components/meta-card";
import { MetaFormDialog } from "@/components/meta-form-dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SupervisorPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [metas, setMetas] = useState<Meta[]>([]);
  const [filteredMetas, setFilteredMetas] = useState<Meta[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMeta, setEditingMeta] = useState<Meta | undefined>();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/");
      return;
    }
    if (currentUser.role !== "supervisor") {
      router.push("/dashboard");
      return;
    }
    setUser(currentUser);
    loadMetas();
  }, [router]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = metas.filter(
        (meta) =>
          meta.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          meta.vendedorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          meta.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMetas(filtered);
    } else {
      setFilteredMetas(metas);
    }
  }, [searchTerm, metas]);

  const loadMetas = () => {
    const allMetas = getMetas();
    setMetas(allMetas);
    setFilteredMetas(allMetas);
  };

  const handleEditMeta = (meta: Meta) => {
    setEditingMeta(meta);
    setDialogOpen(true);
  };

  const handleUpdateMeta = (data: {
    titulo: string;
    descricao: string;
    valorMeta: number;
    valorAtual: number;
    data: string;
  }) => {
    if (!editingMeta) return;

    updateMeta(editingMeta.id, data);
    setEditingMeta(undefined);
    loadMetas();
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-background">
      {/* <Sidebar /> */}

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Todas as Metas
            </h1>
            <p className="mt-2 text-muted-foreground">
              Visualize e edite as metas de todos os vendedores
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por vendedor, título ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {filteredMetas.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center">
              <Search className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Nenhuma meta encontrada
              </h3>
              <p className="text-sm text-muted-foreground">
                {searchTerm
                  ? "Tente ajustar sua busca"
                  : "Ainda não há metas cadastradas"}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredMetas.map((meta) => (
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
        onSubmit={handleUpdateMeta}
        meta={editingMeta}
        isEdit={true}
      />
    </div>
  );
}
