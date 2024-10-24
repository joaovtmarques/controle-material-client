"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import {
  CardContent
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { findAllEquipments } from "@/services/equipment/find-all-equipments";
import type { Equipment } from "@/shared/models/equipment";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "@tanstack/react-query";
import {
  MoreHorizontal
} from "lucide-react";
import Link from "next/link";

export default function Equipments() {
  const user = useUserStore(state => state.user);

  const getEquipments = async (): Promise<Equipment[]> => {
    const response = await findAllEquipments({ userType: user!.type });
    return response;
  }

  const equipmentsQuery = useQuery({
    queryKey: ["equipments"],
    queryFn: getEquipments,
  });

  return (
    <div className="p-8">
      <main className="grid flex-1 items-start gap-4 py-4 px-2 md:gap-8">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipamento</TableHead>
                  <TableHead>Quantidade disponível</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Número de série
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Preço
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Está em carga?
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Condição
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Situação
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipmentsQuery.data?.map((equipment) => (
                  <TableRow key={equipment.id}>
                    <TableCell className="font-medium">
                      {equipment.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{equipment.amount}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {equipment.serialNumber}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {Number(equipment.price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{equipment.isInCharge ? "SIM" : "NÃO"}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{equipment.condition}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{equipment.state}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Link href={`/equipments/${equipment.id}`}>
                              Ver equipamento
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Deletar equipamento</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        </main>
    </div>
  )
}