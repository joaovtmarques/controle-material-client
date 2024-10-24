"use client";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { findAllLoans } from "@/services/loan/find-all-loans";
import { findLoansByStatus } from "@/services/loan/find-loans-by-status";
import type { Loan } from "@/shared/models/loan";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "@tanstack/react-query";
import {
  MoreHorizontal
} from "lucide-react";
import Link from "next/link";

export default function Loans() {

  const user = useUserStore(state => state.user);

  const getLoans = async (): Promise<Loan[]> => {
    const response = await findAllLoans({ userType: user!.type });
    return response;
  }
  const getLoansByStatusOpen = async (): Promise<Loan[]> => {
    const response = await findLoansByStatus({ status: "ABERTO", userType: user!.type });
    return response;
  }
  const getLoansByStatusClosed = async (): Promise<Loan[]> => {
    const response = await findLoansByStatus({ status: "FECHADO", userType: user!.type });
    return response;
  }

  const loansQuery = useQuery({
    queryKey: ["loans"],
    queryFn: getLoans,
  });
  const loansOpenQuery = useQuery({
    queryKey: ["loansOpen"],
    queryFn: getLoansByStatusOpen,
  });
  const loansClosedQuery = useQuery({
    queryKey: ["loansClosed"],
    queryFn: getLoansByStatusClosed,
  });

  return (
    <div className="p-8">
      <main className="grid flex-1 items-start gap-4 py-4 px-2 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="open">Abertas</TabsTrigger>
                <TabsTrigger value="closed">Fechadas</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="border rounded-md">
              {loansQuery.isLoading ? 
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-full h-8 rounded-full animate-pulse bg-zinc-800" />
                  <Skeleton className="w-full h-8 rounded-full animate-pulse bg-zinc-800" />
                </div>
                :
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Equipamento</TableHead>
                      <TableHead>Nome do recebedor</TableHead>
                      <TableHead>Responsável da cautela</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Data de cautela</TableHead>
                      <TableHead>Previsão de devolução</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loansQuery.data?.map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell>{loan.equipments![0].name}</TableCell>
                        <TableCell>{loan.receiver.rank + " " + loan.receiver.warName}</TableCell> 
                        <TableCell>{loan.lender.rank + " " + loan.lender.warName}</TableCell> 
                        <TableCell>{loan.amount}</TableCell>
                        <TableCell>{loan.date}</TableCell>
                        <TableCell>{loan.devolutionDate}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                              >
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>
                                Ações
                              </DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Link
                                  href={{
                                    pathname: `/loans/${loan.id}`,
                                    query: { loan: JSON.stringify(loan) }
                                  }}
                                  >
                                  <Button
                                    variant="outline"
                                    className="w-full"
                                  >
                                    Ver
                                  </Button>
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              } 
            </TabsContent>
            <TabsContent value="open" className="border rounded-md">
              {loansOpenQuery.isLoading ? 
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-full h-8 rounded-full animate-pulse bg-zinc-800" />
                  <Skeleton className="w-full h-8 rounded-full animate-pulse bg-zinc-800" />
                </div>
                :
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Equipamento</TableHead>
                      <TableHead>Nome do recebedor</TableHead>
                      <TableHead>Responsável da cautela</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Data de cautela</TableHead>
                      <TableHead>Previsão de devolução</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loansOpenQuery.data?.map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell>{loan.equipments![0].name}</TableCell>
                        <TableCell>{loan.receiver.rank + " " + loan.receiver.warName}</TableCell> 
                        <TableCell>{loan.lender.rank + " " + loan.lender.warName}</TableCell> 
                        <TableCell>{loan.amount}</TableCell>
                        <TableCell>{loan.date}</TableCell>
                        <TableCell>{loan.devolutionDate}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                              >
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>
                                Ações
                              </DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Link
                                  href={{
                                    pathname: `/loans/${loan.id}`,
                                    query: { loan: JSON.stringify(loan) }
                                  }}
                                  >
                                  <Button
                                    variant="outline"
                                    className="w-full"
                                  >
                                    Ver
                                  </Button>
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              } 
            </TabsContent>
            <TabsContent value="closed" className="border rounded-md">
              {loansClosedQuery.isLoading ? 
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-full h-8 rounded-full animate-pulse bg-zinc-800" />
                  <Skeleton className="w-full h-8 rounded-full animate-pulse bg-zinc-800" />
                </div>
                :
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Equipamento</TableHead>
                      <TableHead>Nome do recebedor</TableHead>
                      <TableHead>Responsável da cautela</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Data de cautela</TableHead>
                      <TableHead>Previsão de devolução</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loansClosedQuery.data?.map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell>{loan.equipments![0].name}</TableCell>
                        <TableCell>{loan.receiver.rank + " " + loan.receiver.warName}</TableCell> 
                        <TableCell>{loan.lender.rank + " " + loan.lender.warName}</TableCell> 
                        <TableCell>{loan.amount}</TableCell>
                        <TableCell>{loan.date}</TableCell>
                        <TableCell>{loan.devolutionDate}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                              >
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>
                                Ações
                              </DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Link
                                  href={{
                                    pathname: `/loans/${loan.id}`,
                                    query: { loan: JSON.stringify(loan) }
                                  }}
                                  >
                                  <Button
                                    variant="outline"
                                    className="w-full"
                                  >
                                    Ver
                                  </Button>
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              } 
            </TabsContent>
          </Tabs>
        </main>
    </div>
  )
}