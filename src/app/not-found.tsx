"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/suiris"); // redireciona para a home
    }, 3000); // 3 segundos

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
      <div className="flex flex-col items-center justify-center space-y-4">
        <AlertTriangle size={64} className="text-orange-500" />
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
          Página não encontrada
        </h1>
        <p className="text-slate-500">
          Você será redirecionado para a página inicial em alguns segundos...
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-5 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
        >
          Voltar agora
        </button>
      </div>
    </div>
  );
}
