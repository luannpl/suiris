"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Target } from "lucide-react";
import { login, initializeUsers, getCurrentUser } from "@/lib/auth";
import { initializeMetas } from "@/lib/metas";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    initializeUsers();
    initializeMetas();

    // Redirecionar se já estiver logado
    const user = getCurrentUser();
    if (user) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const user = login(email);
    if (user) {
      router.push("/dashboard");
    } else {
      setError(
        "Email não encontrado. Tente: joao@3coracoes.com, maria@3coracoes.com ou carlos@3coracoes.com"
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center ">
            <Image
              src="/logo.png"
              alt="Logo"
              width={64}
              height={64}
              className="rounded-full"
            />
            {/* <Target className="h-10 w-10 text-white" /> */}
          </div>
          <h1 className="text-3xl font-bold text-foreground">Suiris</h1>
          <p className="mt-2 text-muted-foreground">
            Plataforma de Gestão de Metas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@3coracoes.com"
              required
            />
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark cursor-pointer"
          >
            Entrar
          </Button>
        </form>

        <div className="mt-6 rounded-lg bg-muted p-4">
          <p className="mb-2 text-sm font-medium text-foreground">
            Usuários de teste:
          </p>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>• joao@3coracoes.com (Vendedor)</li>
            <li>• maria@3coracoes.com (Vendedor)</li>
            <li>• carlos@3coracoes.com (Supervisor)</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
