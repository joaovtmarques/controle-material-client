import {
  ArrowUpRight
} from "lucide-react"
import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function LoansTable() {
  return (
    <Card
      className="xl:col-span-2 w-full min-h-[480px] max-h-[480px]" x-chunk="dashboard-01-chunk-4"
    >
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Cautelas recentes</CardTitle>
          <CardDescription>
            Foram registradas 27 cautelas neste mês
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/loans">
            Ver todas
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Equipamento/Material</TableHead>
              <TableHead className="hidden xl:table-column">
                Type
              </TableHead>
              <TableHead className="hidden xl:table-column">
                Status
              </TableHead>
              <TableHead className="hidden xl:table-column">
                Date
              </TableHead>
              <TableHead className="text-right">Data de cautela</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium">Computador Dell I5 8gb</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  Sd Vitor Silva
                </div>
              </TableCell>
              <TableCell className="hidden xl:table-column">
                Sale
              </TableCell>
              <TableCell className="hidden xl:table-column">
                <Badge className="text-xs" variant="outline">
                  Approved
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                2023-06-23
              </TableCell>
              <TableCell className="text-right">22-09-2024</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Computador Dell I5 8gb</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  Sd Vitor Silva
                </div>
              </TableCell>
              <TableCell className="hidden xl:table-column">
                Sale
              </TableCell>
              <TableCell className="hidden xl:table-column">
                <Badge className="text-xs" variant="outline">
                  Approved
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                2023-06-23
              </TableCell>
              <TableCell className="text-right">22-09-2024</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Computador Dell I5 8gb</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  Sd Vitor Silva
                </div>
              </TableCell>
              <TableCell className="hidden xl:table-column">
                Sale
              </TableCell>
              <TableCell className="hidden xl:table-column">
                <Badge className="text-xs" variant="outline">
                  Approved
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                2023-06-23
              </TableCell>
              <TableCell className="text-right">22-09-2024</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Computador Dell I5 8gb</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  Sd Vitor Silva
                </div>
              </TableCell>
              <TableCell className="hidden xl:table-column">
                Sale
              </TableCell>
              <TableCell className="hidden xl:table-column">
                <Badge className="text-xs" variant="outline">
                  Approved
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                2023-06-23
              </TableCell>
              <TableCell className="text-right">22-09-2024</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}