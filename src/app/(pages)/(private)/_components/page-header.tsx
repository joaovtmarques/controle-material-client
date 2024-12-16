"use client";

import { Calendar, LoaderIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { day, month } from "@/constants/date";
import { components } from "@/constants/menu";
import { usePathname } from "next/navigation";
import CategoryForm from "./category-form";
import EquipmentForm from "./equipment-form";
import ReceiverForm from "./receiver-form";
import { createLoanReady, getLoanReady } from "@/services/loan/get-loan-ready";
import { useUserStore } from "@/store/user-store";
import { useState } from "react";

export default function PageHeader() {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);

  const [isLoading, setDownloadIsLoading] = useState(false);

  const id = pathname.split("/").pop() || "";

  function getDate() {
    const data = new Date(Date.now());

    const d = day[data.getDay()];
    const date = data.getDate();
    const m = month[data.getMonth()];
    const year = data.getFullYear();

    return `${d}, ${date} de ${m} de ${year}`;
  }

  async function handleLoanReady() {
    try {
      setDownloadIsLoading(true);
      const filePath = await createLoanReady({ userType: user.type });
      const response = (await getLoanReady({
        filePath: filePath.toString(),
      })) as unknown as Blob;

      const downloadUrl = window.URL.createObjectURL(response);

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = filePath.split("/").pop() || "download";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      alert("Erro ao fazer o download: " + error);
    } finally {
      setDownloadIsLoading(false);
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-zinc-50">
          {(pathname === `/loans/${id}` && "Cautela") ||
            (pathname === `/equipments/${id}` && "Equipamento") ||
            components.map((component) => {
              if (component.href === pathname) {
                return component.title;
              }
            })}
        </h1>
        <div className="flex items-center gap-4">
          <Card className="w-max flex gap-2 items-center border border-zinc-800 h-12 px-4">
            <Calendar />
            <h5 className="font-medium text-sm">{getDate()}</h5>
          </Card>
          {pathname === "/loans" || pathname === `/loans/${id}` ? (
            <Button className="font-medium text-sm h-12">
              Registrar cautela
            </Button>
          ) : pathname === `/categories` ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="font-medium text-sm h-12">
                  Registrar categoria
                </Button>
              </DialogTrigger>
              <CategoryForm categoryType="CREATE" />
            </Dialog>
          ) : pathname === `/equipments` ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="font-medium text-sm h-12">
                  Registrar equipamento
                </Button>
              </DialogTrigger>
              <EquipmentForm />
            </Dialog>
          ) : pathname === `/receivers` ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="font-medium text-sm h-12">
                  Registrar recebedor
                </Button>
              </DialogTrigger>
              <ReceiverForm />
            </Dialog>
          ) : pathname === `/overview` ? (
            <Button
              onClick={handleLoanReady}
              className="font-medium text-sm h-12"
            >
              {isLoading ? (
                <LoaderIcon className="animate-spin" />
              ) : (
                "Gerar pronto"
              )}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
