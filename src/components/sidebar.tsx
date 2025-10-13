"use client";

import {
  Home,
  Target,
  Trophy,
  LogOut,
  BarChart3,
  X,
  Menu,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout, getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type { User } from "@/lib/types";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const isSupervisor = user?.role === "supervisor";

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard", show: true },
    {
      href: "/dashboard/vendedor",
      icon: Target,
      label: "Minhas Metas",
      show: !isSupervisor,
    },
    {
      href: "/dashboard/supervisor",
      icon: BarChart3,
      label: "Todas as Metas",
      show: isSupervisor,
    },
    { href: "/dashboard/ranking", icon: Trophy, label: "Ranking", show: true },
  ];

  return (
    <>
      {/* BOTÃO MOBILE */}
      {!isMobileOpen && (
        <div className="md:hidden fixed top-1 left-1 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileOpen(true)}
            className="h-10 w-10 rounded-full bg-primary text-white shadow-lg"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* SIDEBAR PRINCIPAL */}
      <div
        className={`flex flex-col border-r border-border bg-card transition-all duration-300
          ${isCollapsed ? "w-16" : "w-64"}
          md:relative md:h-screen
          ${
            isMobileOpen
              ? "fixed inset-0 z-40 h-screen w-full"
              : "hidden md:flex"
          }
        `}
      >
        {/* Cabeçalho */}
        <div className="flex h-16 items-center justify-between border-b border-border px-3">
          {!isCollapsed && (
            <div className="flex items-center gap-3 px-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  3 Corações
                </h1>
                <p className="text-xs text-muted-foreground">Gestão de Metas</p>
              </div>
            </div>
          )}

          <Button
            onClick={() =>
              isMobileOpen
                ? setIsMobileOpen(false)
                : setIsCollapsed(!isCollapsed)
            }
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            title={
              isMobileOpen ? "Fechar" : isCollapsed ? "Expandir" : "Recolher"
            }
          >
            {isMobileOpen ? (
              <X className="h-4 w-4" />
            ) : isCollapsed ? (
              <Menu className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Usuário */}
        {user && !isCollapsed && (
          <div className="border-b border-border px-6 py-4">
            <p className="text-sm font-medium text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {user.role}
            </p>
          </div>
        )}

        {/* Navegação */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map(
            (item) =>
              item.show && (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isCollapsed ? "justify-center" : "gap-3"
                  } ${
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  title={isCollapsed ? item.label : undefined}
                  onClick={() => setIsMobileOpen(false)} // fecha menu ao clicar
                >
                  <item.icon className="h-5 w-5" />
                  {!isCollapsed && item.label}
                </Link>
              )
          )}
        </nav>

        {/* Logout */}
        <div className="border-t border-border p-3">
          <Button
            onClick={() => {
              handleLogout();
              setIsMobileOpen(false);
            }}
            variant="ghost"
            className={`w-full cursor-pointer text-muted-foreground hover:text-foreground ${
              isCollapsed ? "justify-center px-3" : "justify-start gap-3"
            }`}
            title={isCollapsed ? "Sair" : undefined}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && "Sair"}
          </Button>
        </div>
      </div>

      {/* Fundo escuro no mobile */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
}
