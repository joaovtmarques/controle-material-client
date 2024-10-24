"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { findAllCategories } from "@/services/categories/find-all-categories";
import type { Category } from "@/shared/models/category";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "@tanstack/react-query";
import {
  MoreHorizontal
} from "lucide-react";
import CategoryForm from "../_components/category-form";

export default function Categories() {
  const user = useUserStore(state => state.user);

  const getCategories = async (): Promise<Category[]> => {
    const response = await findAllCategories({ userType: user!.type });
    return response;
  }

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoriesQuery.data && categoriesQuery.data?.map((category) => (
                  <TableRow key={category.id} className="flex items-center justify-between">
                    <TableCell className="font-medium">
                      {category.name}
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
                          <Dialog>
                            <DialogTrigger asChild>
                              {/* <DropdownMenuItem>Editar categoria</DropdownMenuItem>/ */}
                              <Button variant="outline">Editar categoria</Button>
                            </DialogTrigger>
                            <CategoryForm categoryType="UPDATE" category={category} />
                          </Dialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {categoriesQuery.isLoading && (
                  <TableRow>
                    <TableCell>
                      <Skeleton className="h-4 w-full rounded-full" />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        </main>
    </div>
  )
}