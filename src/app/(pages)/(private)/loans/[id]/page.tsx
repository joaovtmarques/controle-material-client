"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { findLoanById } from "@/services/loan/find-loan-by-id";
import { updateLoan } from "@/services/loan/update-loan";
import type { Loan } from "@/shared/models/loan";
import { useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Loan() {
  const params = useParams();
  const [alteration, setAlteration] = useState(false);
  const [status, setStatus] = useState(false);
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getLoan = async (): Promise<Loan | null> => {
    const response = await findLoanById({ id: Number(params.id) });
    return response;
  };

  const loanQuery = useQuery({
    queryKey: ["loan", params.id],
    queryFn: getLoan,
  });

  useEffect(() => {
    if (loanQuery.data) {
      setStatus(loanQuery.data.status === "FECHADO");
      setAlteration(loanQuery.data.alteration);
      
      const actualPrice = loanQuery.data.equipments!.reduce((acc, equipment) => acc + Number(equipment.price), 0);
      setPrice(actualPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }));
    }
  }, [loanQuery.data]);

  const handleUpdateLoan = async () => {
    setIsLoading(true);
    const updatedStatus = status ? "FECHADO" : "ABERTO";

    await updateLoan({
      id: Number(params.id),
      status: updatedStatus,
      alteration,
    })
    .then((response) => {
      setIsLoading(false);
      if (response) {
        toast("Cautela atualizada com sucesso.", {
          description: "Clique em confirmar para atualizar a página e ver as mudanças.",
          action: {
            label: "Confirmar",
            onClick: () => window.location.reload(),
          },
        });
      }
    })
    .catch(error => {
      toast.error(error.message);
    });
  }

  return (
    <div className="p-8 flex gap-16">
      <div className="w-auto flex flex-col gap-4">
        <Button onClick={handleUpdateLoan}>
        {isLoading ? <LoaderIcon className="animate-spin" /> : "Salvar"}
        </Button>
        <Button className="border bg-transparent text-zinc-400 hover:bg-primary hover:text-background" 
                onClick={() => loanQuery.data?.loanDoc?.filePath && window.open(loanQuery.data.loanDoc.filePath)}>
          Fazer download
        </Button>
      </div>
      <div className="w-auto flex flex-col gap-4">
        <header>
          {loanQuery.data ? 
            <h3 className="font-medium text-lg text-zinc-50">{loanQuery.data.equipments![0].name}</h3>
            :
            <Skeleton className="w-1/3 h-6 rounded-full animate-pulse bg-zinc-800" />
          }
          {loanQuery.data ? 
            <h5 className="font-normal text-sm text-zinc-400">Sem observação</h5>
            :
            <Skeleton className="w-1/3 h-4 mt-4 rounded-full animate-pulse bg-zinc-800" />
          }
        </header>
        <Separator />
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            <Card className="flex flex-col p-6 gap-6">
              <div>
                <h3 className="font-medium text-base text-zinc-50">Cautela</h3>
                <h5 className="font-normal text-xs text-zinc-400">Atualize informações sobre a cautela</h5>
              </div>
              <div className="flex items-center justify-between gap-x-4">
                <div>
                  <h3 className="font-medium text-base text-zinc-50 flex gap-x-4 items-center">Status - {loanQuery.data ? loanQuery.data.status : <Skeleton className="w-1/3 h-6 rounded-full animate-pulse bg-zinc-800" />}</h3>
                  <h5 className="font-normal text-xs text-zinc-400">Se o material já foi devolvido ou não será<br /> devolvido, marque a cautela como FECHADO.</h5>
                </div>
                <Switch onCheckedChange={(checked) => setStatus(checked)} checked={status} />
              </div>
              <div className="flex items-center justify-between gap-x-4">
                <div>
                  <h3 className="font-medium text-base text-zinc-50">Alteração</h3>
                  <h5 className="font-normal text-xs text-zinc-400">Marque se houve alteração com o equipamento<br /> na descautela do material.</h5>
                </div>
                <Switch onCheckedChange={(checked) => setAlteration(checked)} checked={alteration} />
              </div>
            </Card>
            <Card className="flex flex-col p-6 gap-6">
              <div>
                <h3 className="font-medium text-base text-zinc-50">Responsáveis</h3>
                <h5 className="font-normal text-xs text-zinc-400">Quem registrou a cautela e quem recebeu</h5>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{loanQuery.data && loanQuery.data.lender.warName.split(" ").length > 1 ? loanQuery.data.lender.warName.split(" ")[0][0] + loanQuery.data.lender.warName.split(" ")[1][0] : loanQuery.data && loanQuery.data.lender.warName.split(" ")[0][0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    {loanQuery.isLoading ? (
                      <Skeleton className="w-full rounded-full animate-pulse bg-zinc-400" />
                    ) : (
                      <div>
                          <h3 className="font-medium text-base text-zinc-50">{loanQuery.data && loanQuery.data.lender.rank + " " + loanQuery.data.lender.warName}</h3>
                          <h5 className="font-normal text-xs text-zinc-400">{loanQuery.data && loanQuery.data.lender.company}</h5>
                      </div>
                    )}
                  </div>
                </div>
                <Card className="text-sm text-zinc-50 font-medium px-2 py-[6px]">
                  Registrou a cautela
                </Card>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{loanQuery.data && loanQuery.data.receiver.warName.split(" ").length > 1 ? loanQuery.data && loanQuery.data.receiver.warName.split(" ")[0][0] + loanQuery.data && loanQuery.data.receiver.warName.split(" ")[1][0] : loanQuery.data && loanQuery.data.receiver.warName.split(" ")[0][0]}</AvatarFallback>
                  </Avatar>
                  {loanQuery.isLoading ? (
                    <Skeleton className="w-full rounded-full animate-pulse bg-zinc-400" />
                  ) : (
                    <div>
                      <h3 className="font-medium text-base text-zinc-50">{loanQuery.data && loanQuery.data.receiver.rank + " " + loanQuery.data.receiver.warName}</h3>
                      <h5 className="font-normal text-xs text-zinc-400">{loanQuery.data && loanQuery.data.receiver.company}</h5>
                    </div>
                  )}
                </div>
                <Card className="text-sm text-zinc-50 font-medium px-2 py-[6px]">
                  Recebeu a cautela
                </Card>
              </div>
            </Card>
          </div>
          <div className="flex flex-col gap-4">
            <Card className="w-full h-auto flex flex-col gap-2 items-center p-4">
              <div className="w-full flex items-center justify-between">
                <h1 className="font-medium text-sm">
                  Equipamento - {loanQuery.data && loanQuery.data.equipments![0].isInCharge ? "CARGA" : "FORA DE CARGA"} - {loanQuery.data && loanQuery.data.equipments![0].condition}
                </h1>
              </div>
              <div className="w-full">
                {loanQuery.isLoading ? (
                  <Skeleton className="w-full h-6 rounded-full animate-pulse bg-zinc-800" />
                ) : (
                  <h3 className="font-bold text-2xl">{price}</h3>
                )}
                {loanQuery.isLoading ? (
                  <Skeleton className="w-full h-4 mt-2 rounded-full animate-pulse bg-zinc-800" />
                ) : (
                  <p className="font-regular text-zinc-400 text-xs">{loanQuery.data && loanQuery.data.equipments![0].serialNumber}</p>
                )}
              </div>
            </Card>
            <Card className="w-full h-auto flex flex-col gap-2 items-center p-4">
              <div className="w-full flex items-center justify-between">
                <h1 className="font-medium text-sm flex items-center gap-x-4">
                  Cautela: {loanQuery.data ? loanQuery.data.date : <Skeleton className="w-full h-4 rounded-full animate-pulse bg-zinc-800" />}
                </h1>
              </div>
              <div className="w-full">
                <h3 className="font-bold text-2xl">{loanQuery.isLoading ? <Skeleton className="w-full h-8 rounded-full animate-pulse bg-zinc-800 mb-2" /> : loanQuery.data!.status}</h3>
                <p className="font-regular text-zinc-400 text-xs">Devolução: {loanQuery.data && loanQuery.data.devolutionDate && loanQuery.data && loanQuery.data.devolutionDate || "Não prevista"}</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
