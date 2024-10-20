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
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import type { Loan } from "@/shared/models/loan"
import { filterAndSortLoan } from "@/libs/filter-and-sort-loan"
import { Skeleton } from "@/components/ui/skeleton"

interface LoansTableProps {
  loans: Loan[]
}

export default function LoansTable({
  loans
}: LoansTableProps) {

  const formattedLoans = filterAndSortLoan(loans);

  return (
    <Card
      className="xl:col-span-2 w-full min-h-[480px] max-h-[480px] overflow-hidden" x-chunk="dashboard-01-chunk-4"
    >
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Cautelas recentes</CardTitle>
          <CardDescription>
            Foram registradas {formattedLoans && formattedLoans.length} cautelas neste mês
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
            {loans ? (
              formattedLoans!.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell>
                    <div className="font-medium">{loan.equipments?.length === 1 ? loan.equipments[0].name : ""}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {loan.receiver.rank + " " + loan.receiver.warName}
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
                    {loan.date}
                  </TableCell>
                  <TableCell className="text-right">{loan.date || "Sem informação"}</TableCell>
                </TableRow>
              ))
            ) : (
              <Skeleton className="w-full mt-4 h-8 rounded-full animate-pulse bg-zinc-800" />
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}