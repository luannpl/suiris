"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Card } from "@/components/ui/card";
import {
  AlertCircle,
  Bot,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { getMetas, getMetasByVendedor } from "@/lib/metas";
import { User } from "@/lib/types";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState({
    totalMetas: 0,
    metasConcluidas: 0,
    metasEmProgresso: 0,
    percentualGeral: 0,
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/");
      return;
    }
    setUser(currentUser);

    // Calcular estatísticas
    const metas =
      currentUser.role === "supervisor"
        ? getMetas()
        : getMetasByVendedor(currentUser.id);

    const concluidas = metas.filter((m) => m.status === "concluida").length;
    const emProgresso = metas.filter((m) => m.status === "em_progresso").length;
    const percentual = metas.length > 0 ? (concluidas / metas.length) * 100 : 0;

    setStats({
      totalMetas: metas.length,
      metasConcluidas: concluidas,
      metasEmProgresso: emProgresso,
      percentualGeral: percentual,
    });
  }, [router]);

  if (!user) return null;

  const isSupervisor = user.role === "supervisor";

  return (
    <div className="flex h-screen bg-background">
      {/* <Sidebar /> */}

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-8 mt-8 sm:mt-0">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Bem-vindo, {user.name}!
            </h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground">
              {isSupervisor
                ? "Acompanhe o desempenho de toda a equipe"
                : "Acompanhe suas metas e progresso"}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Link
              href={isSupervisor ? "/suiris/supervisor" : "/suiris/vendedor"}
            >
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total de Metas
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.totalMetas}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link
              href={isSupervisor ? "/suiris/supervisor" : "/suiris/vendedor"}
            >
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                    <Trophy className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Concluídas</p>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.metasConcluidas}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link
              href={isSupervisor ? "/suiris/supervisor" : "/suiris/vendedor"}
            >
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                    <TrendingUp className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Em Progresso
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.metasEmProgresso}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Taxa de Sucesso
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.percentualGeral.toFixed(0)}%
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Acesso Rápido
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card
                className="cursor-pointer p-6 transition-all hover:shadow-primary hover:shadow-md"
                onClick={() =>
                  router.push(
                    isSupervisor ? "/suiris/supervisor" : "/suiris/vendedor"
                  )
                }
              >
                <div className="flex items-center gap-1">
                  <Target className=" h-8 w-8 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    {isSupervisor ? "Gerenciar Todas as Metas" : "Minhas Metas"}
                  </h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isSupervisor
                    ? "Visualize e edite as metas de todos os vendedores"
                    : "Cadastre e acompanhe suas metas diárias"}
                </p>
              </Card>
              <Card
                className="cursor-pointer p-6 transition-all hover:shadow-primary hover:shadow-md"
                onClick={() =>
                  router.push(
                    isSupervisor
                      ? "/suiris/supervisor/monitoramento"
                      : "/suiris/vendedor/clientes"
                  )
                }
              >
                <div className="flex items-center gap-2">
                  <Users className=" h-8 w-8 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    {isSupervisor ? "Monitoramento" : "Meus Clientes"}
                  </h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isSupervisor
                    ? "Monitore atividades e desempenho da equipe"
                    : "Cadastre e acompanhe seus clientes"}
                </p>
              </Card>

              <Card
                className="cursor-pointer p-6 transition-all hover:shadow-primary hover:shadow-md"
                onClick={() =>
                  router.push(
                    isSupervisor
                      ? "/suiris/supervisor/alertas"
                      : "/suiris/ranking"
                  )
                }
              >
                <div className="flex items-center gap-2">
                  {isSupervisor ? (
                    <AlertCircle className=" h-8 w-8 text-primary" />
                  ) : (
                    <Trophy className=" h-8 w-8 text-primary" />
                  )}
                  <h3 className="text-lg font-semibold text-foreground">
                    {isSupervisor ? "Alertas e Ações" : "Ranking"}
                  </h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isSupervisor
                    ? "Gerencie ações para a equipe"
                    : "Veja o ranking dos melhores vendedores"}
                </p>
              </Card>

              <Card
                className="cursor-pointer p-6 transition-all hover:shadow-primary hover:shadow-md"
                onClick={() => router.push("/suiris/clara")}
              >
                <div className="flex items-center gap-2">
                  <Bot className=" h-8 w-8 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Clara AI
                  </h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fale com a assistente virtual Clara para tirar dúvidas
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
