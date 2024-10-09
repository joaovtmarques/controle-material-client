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

export default function Receivers() {
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
                <TableRow>
                  <TableCell className="font-medium">
                    João Vitor da Silva Marques
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Sd EP</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    Vitor Silva
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    CCAp
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    52267935880
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    12992446221
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
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        </main>
    </div>
  )
}