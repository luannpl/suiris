"use client";

import { User } from "./types";

const USERS_KEY = "sales_platform_users";
const CURRENT_USER_KEY = "sales_platform_current_user";

// Usuários de exemplo
const defaultUsers: User[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@3coracoes.com",
    role: "vendedor",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@3coracoes.com",
    role: "vendedor",
  },
  {
    id: "3",
    name: "Carlos Supervisor",
    email: "carlos@3coracoes.com",
    role: "supervisor",
  },
  { id: "4", name: "Ana Costa", email: "ana@3coracoes.com", role: "vendedor" },
];

export function initializeUsers() {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(USERS_KEY);
  if (!stored) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
}

export function login(email: string): User | null {
  if (typeof window === "undefined") return null;

  const users = getUsers();
  const user = users.find((u) => u.email === email);

  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  }

  return null;
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function getUsers(): User[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : defaultUsers;
}
