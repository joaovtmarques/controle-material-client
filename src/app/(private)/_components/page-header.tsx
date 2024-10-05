"use client";

import { Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger
} from "@/components/ui/dialog";
import { day, month } from "@/constants/date";
import { components } from "@/constants/menu";
import { usePathname } from "next/navigation";
import CategoryForm from "./category-form";
import EquipmentForm from "./equipment-form";

export default function PageHeader() {
  const pathname = usePathname();

  const id = pathname.split('/').pop() || ''

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
        <h1 className="text-3xl font-bold text-zinc-50">
          { pathname === `/loans/${id}` && "Cautela" 
            || pathname === `/equipments/${id}` && "Equipamento"
            || components.map((component) => {
              if(component.href === pathname) {
                return component.title
              }
            })
          }
        </h1>
        <div className="flex items-center gap-4">
          <Card className="w-max flex gap-2 items-center border border-zinc-800 h-12 px-4">
            <Calendar />
            <h5 className="font-medium text-sm">{getDate()}</h5>
          </Card>
          {
            pathname === "/loans" || pathname === `/loans/${id}` ? (
              <Button className="font-medium text-sm h-12">
                Registrar cautela
              </Button>
          ) : pathname === `/categories` ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="font-medium text-sm h-12">Registrar categoria</Button>
              </DialogTrigger>
              <CategoryForm />
            </Dialog>
          ) : pathname === `/equipments` ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="font-medium text-sm h-12">Registrar equipamento</Button>
                </DialogTrigger>
                <EquipmentForm />
              </Dialog>
          ) : null
          }
        </div>
      </div>
    </div>
  )
}