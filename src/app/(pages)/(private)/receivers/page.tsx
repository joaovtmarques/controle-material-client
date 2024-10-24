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
import {
  MoreHorizontal
} from "lucide-react";
import type { Receiver } from "@/shared/models/receiver";
import { findAllReceivers } from "@/services/receivers/find-all-receivers";
import { useQuery } from "@tanstack/react-query";

export default function Receivers() {

  const getReceivers = async (): Promise<Receiver[]> => {
    const response = await findAllReceivers();
    return response;
  }

  const receiversQuery = useQuery({
    queryKey: ['receivers'],
    queryFn: getReceivers
  });

  return (
    <div className="p-8">
      <main className="grid flex-1 items-start gap-4 py-4 px-2 md:gap-8">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Posto/Grad</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Nome de guerra
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    OM/Su
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    CPF
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Telefone
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receiversQuery.data && receiversQuery.data?.map((receiver) => (
                  <TableRow key={receiver.id}>
                    <TableCell className="font-medium">
                      {receiver.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{receiver.rank}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {receiver.warName}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {receiver.company}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {receiver.cpf}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {receiver.telephone}
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
                          <DropdownMenuItem>Excluir recebedor</DropdownMenuItem>
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