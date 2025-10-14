"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Users, AlertTriangle, CheckCircle } from "lucide-react";
import {
  getClientesByVendedor,
  addCliente,
  updateCliente,
  initializeMockData,
} from "@/lib/clientes";
import type { Cliente, User } from "@/lib/types";
import { ClienteFormDialog } from "@/components/cliente-form-dialog";

export default function ClientesVendedorPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | undefined>();

  // Estados dos filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");

  useEffect(() => {
    initializeMockData();

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
    loadClientes(currentUser.id);
  }, [router]);

  const loadClientes = (vendedorId: string) => {
    const userClientes = getClientesByVendedor(vendedorId);
    console.log("Carregando clientes para vendedor:", vendedorId);
    console.log("Clientes encontrados:", userClientes);
    setClientes(userClientes);
    setFilteredClientes(userClientes);
  };

  const handleAddCliente = (data: {
    nomeRazaoSocial: string;
    email: string;
    telefone: string;
    endereco: string;
    dataUltimaCompra: string | null;
    inadimplente: boolean;
    valorDebitoTotal: number;
  }) => {
    if (!user) return;

    if (editingCliente) {
      updateCliente(editingCliente.id, data);
      setEditingCliente(undefined);
    } else {
      addCliente({
        ...data,
        vendedorId: user.id,
      });
    }

    loadClientes(user.id);
  };

  const handleEditCliente = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setDialogOpen(true);
  };

  // Aplicar filtros
  useEffect(() => {
    let filtered = clientes;

    if (searchTerm) {
      filtered = filtered.filter((cliente) =>
        cliente.nomeRazaoSocial.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter === "inadimplentes") {
      filtered = filtered.filter((cliente) => cliente.inadimplente);
    } else if (statusFilter === "adimplentes") {
      filtered = filtered.filter((cliente) => !cliente.inadimplente);
    }

    setFilteredClientes(filtered);
  }, [clientes, searchTerm, statusFilter]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Nunca";
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const getTotalStats = () => {
    const total = clientes.length;
    const inadimplentes = clientes.filter((c) => c.inadimplente).length;
    const adimplentes = total - inadimplentes;
    const totalDebito = clientes.reduce(
      (sum, c) => sum + c.valorDebitoTotal,
      0
    );

    return { total, inadimplentes, adimplentes, totalDebito };
  };

  const stats = getTotalStats();

  if (!user) return null;

  return (
    <div className="flex-1 overflow-y-auto ">
      <div className="p-4 sm:p-6 lg:p-8 mt-8 sm:mt-0">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Meus Clientes
            </h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground">
              Gerencie seus clientes e acompanhe o status de pagamentos
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingCliente(undefined);
              setDialogOpen(true);
            }}
            className="bg-primary hover:bg-primary-dark w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </div>

        {/* Cards de estatísticas */}
        <div className="mb-6 sm:mb-8 grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Total de Clientes
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="text-xl sm:text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Adimplentes
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="text-xl sm:text-2xl font-bold text-green-600">
                {stats.adimplentes}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Inadimplentes
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="text-xl sm:text-2xl font-bold text-red-600">
                {stats.inadimplentes}
              </div>
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Total em Débito
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="text-xl sm:text-2xl font-bold text-red-600">
                {formatCurrency(stats.totalDebito)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="flex gap-3 sm:gap-4 flex-col sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="adimplentes">Adimplentes</SelectItem>
                  <SelectItem value="inadimplentes">Inadimplentes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de clientes */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">
              Lista de Clientes ({filteredClientes.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            {filteredClientes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-base sm:text-lg font-semibold text-foreground">
                  {searchTerm || statusFilter !== "todos"
                    ? "Nenhum cliente encontrado"
                    : "Nenhum cliente cadastrado"}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground px-4">
                  {searchTerm || statusFilter !== "todos"
                    ? "Tente ajustar os filtros de busca"
                    : "Comece adicionando seu primeiro cliente"}
                </p>
                {!searchTerm && statusFilter === "todos" && (
                  <Button
                    onClick={() => setDialogOpen(true)}
                    className="bg-primary hover:bg-primary-dark"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Cliente
                  </Button>
                )}
              </div>
            ) : (
              <>
                {/* View Mobile - Cards */}
                <div className="block lg:hidden space-y-4">
                  {filteredClientes.map((cliente) => (
                    <Card key={cliente.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-base truncate">
                              {cliente.nomeRazaoSocial}
                            </h3>
                            <Badge
                              variant={
                                cliente.inadimplente ? "destructive" : "default"
                              }
                              className={`mt-2 ${
                                cliente.inadimplente
                                  ? "bg-red-100 text-red-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {cliente.inadimplente
                                ? "Inadimplente"
                                : "Adimplente"}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <span className="font-medium text-muted-foreground">
                              Email:
                            </span>
                            <span className="truncate">{cliente.email}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="font-medium text-muted-foreground">
                              Telefone:
                            </span>
                            <span>{cliente.telefone}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="font-medium text-muted-foreground">
                              Endereço:
                            </span>
                            <span className="break-words">
                              {cliente.endereco}
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="font-medium text-muted-foreground">
                              Última compra:
                            </span>
                            <span>{formatDate(cliente.dataUltimaCompra)}</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Débito Total
                            </p>
                            <p
                              className={`text-lg font-bold ${
                                cliente.valorDebitoTotal > 0
                                  ? "text-red-600"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {formatCurrency(cliente.valorDebitoTotal)}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditCliente(cliente)}
                          >
                            Editar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* View Desktop - Tabela */}
                <div className="hidden lg:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome/Razão Social</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Última Compra</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Débito</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClientes.map((cliente) => (
                        <TableRow key={cliente.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {cliente.nomeRazaoSocial}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {cliente.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{cliente.telefone}</div>
                              <div className="text-muted-foreground truncate max-w-[200px]">
                                {cliente.endereco}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {formatDate(cliente.dataUltimaCompra)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                cliente.inadimplente ? "destructive" : "default"
                              }
                              className={
                                cliente.inadimplente
                                  ? "bg-red-100 text-red-800 hover:bg-red-200"
                                  : "bg-green-100 text-green-800 hover:bg-green-200"
                              }
                            >
                              {cliente.inadimplente
                                ? "Inadimplente"
                                : "Adimplente"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span
                              className={
                                cliente.valorDebitoTotal > 0
                                  ? "font-semibold text-red-600"
                                  : "text-muted-foreground"
                              }
                            >
                              {formatCurrency(cliente.valorDebitoTotal)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditCliente(cliente)}
                            >
                              Editar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <ClienteFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleAddCliente}
        cliente={editingCliente}
        isEdit={!!editingCliente}
      />
    </div>
  );
}
