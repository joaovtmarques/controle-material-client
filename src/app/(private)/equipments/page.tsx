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

export default function Equipments() {
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
                <TableRow>
                  <TableCell className="font-medium">
                    Computador Dell I5 8gb
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">10</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    XND3XCE43F
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    R$5.000
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">SIM</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">USADO</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">EM ESTOQUE</Badge>
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
                        <DropdownMenuItem>Ver equipamento</DropdownMenuItem>
                        <DropdownMenuItem>Deletar equipamento</DropdownMenuItem>
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