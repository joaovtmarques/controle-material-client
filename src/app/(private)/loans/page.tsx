import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { day, month } from "@/constants/date";
import { Calendar } from "lucide-react";

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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  MoreHorizontal
} from "lucide-react";

export default function Loans() {

  function getDate() {
    const data = new Date(Date.now());

    const d = day[data.getDay()];
    const date = data.getDate();
    const m = month[data.getMonth()];
    const year = data.getFullYear();

    return `${d}, ${date} de ${m} de ${year}`;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-zinc-50">Cautelas</h1>
        <div className="flex items-center gap-4">
          <Card className="w-max flex gap-2 items-center border border-zinc-800 h-12 px-4">
            <Calendar />
            <h5 className="font-medium text-sm">{getDate()}</h5>
          </Card>
          <Button className="font-medium text-sm h-12">Registrar cautela</Button>
        </div>
      </div>
      <main className="grid flex-1 items-start gap-4 py-4 px-2 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="active">Abertas</TabsTrigger>
                <TabsTrigger value="draft">Fechadas</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Equipamento</TableHead>
                        <TableHead>Recebedor</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Responsável da cautela
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Quantidade
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Data de cautela
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Previsão de devolução
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="hidden sm:table-cell">
                          <Card className="h-6 w-6 rounded-full bg-green-400" />
                        </TableCell>
                        <TableCell className="font-medium">
                          Computador Dell I5 8gb
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Sd Vitor Silva</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline">Sd Vitor Silva</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          1
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          25-09-2024
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          26-09-2024
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
                              <DropdownMenuItem>Ver cautela</DropdownMenuItem>
                              <DropdownMenuItem>Deletar cautela</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
    </div>
  )
}