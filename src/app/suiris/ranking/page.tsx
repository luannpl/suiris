"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";
import { getRanking } from "@/lib/metas";
import type { User } from "@/lib/types";

export default function RankingPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ranking, setRanking] = useState<
    Array<{
      vendedorId: string;
      vendedorName: string;
      metasConcluidas: number;
      totalMetas: number;
      percentual: number;
    }>
  >([]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/");
      return;
    }
    setUser(currentUser);

    const rankingData = getRanking();
    setRanking(rankingData);
  }, [router]);

  if (!user) return null;

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="h-8 w-8 text-yellow-500" />;
      case 1:
        return <Medal className="h-8 w-8 text-gray-400" />;
      case 2:
        return <Award className="h-8 w-8 text-orange-600" />;
      default:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-bold text-muted-foreground">
            {position + 1}
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* <Sidebar /> */}

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Ranking de Vendedores
            </h1>
            <p className="mt-2 text-muted-foreground">
              Classificação por metas concluídas
            </p>
          </div>

          {ranking.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center">
              <Trophy className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Nenhum dado disponível
              </h3>
              <p className="text-sm text-muted-foreground">
                Ainda não há metas cadastradas para gerar o ranking
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {ranking.map((vendedor, index) => (
                <Card
                  key={vendedor.vendedorId}
                  className={`p-6 transition-all ${
                    user.id === vendedor.vendedorId
                      ? "bg-gradient-to-br from-orange-50 to-orange-100"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-6">
                    {/* Position */}
                    <div className="flex-shrink-0">{getMedalIcon(index)}</div>

                    {/* Vendedor Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {vendedor.vendedorName}
                        </h3>
                        {user.id === vendedor.vendedorId && (
                          <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-white">
                            Você
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {vendedor.metasConcluidas} de {vendedor.totalMetas}{" "}
                        metas concluídas
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-3xl font-bold text-primary">
                        {vendedor.metasConcluidas}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {vendedor.percentual.toFixed(0)}% de sucesso
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${vendedor.percentual}%` }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
