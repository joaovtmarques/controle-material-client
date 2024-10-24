"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { findEquipmentById } from "@/services/equipment/find-equipment-by-id";
import { updateEquipment } from "@/services/equipment/update-equipment";
import type { Equipment } from "@/shared/models/equipment";
import { useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Equipment() {
  const { id } = useParams();

  const [isInCharge, setIsInCharge] = useState(false);
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getEquipment = async (): Promise<Equipment | null> => {
    const response = await findEquipmentById({ id: Number(id) });
    return response;
  };

  const equipmentQuery = useQuery({
    queryKey: ["equipment", id],
    queryFn: getEquipment,
  });

  useEffect(() => {
    if (equipmentQuery.data) {
      setCondition(equipmentQuery.data.condition);
      setIsInCharge(equipmentQuery.data.isInCharge);
      
      const actualPrice = Number(equipmentQuery.data.price)
      setPrice(actualPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }));
    }
  }, [equipmentQuery.data]);

  const handleUpdateEquipment = async () => {
    setIsLoading(true);

    await updateEquipment({
      id: Number(id),
      isInCharge,
      condition,
    })
    .then((response) => {
      setIsLoading(false);
      if (response) {
        toast("Equipamento atualizado com sucesso.", {
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
        <header>
          {equipmentQuery.data && (
            <div>
              <h3 className="font-medium text-lg text-zinc-50">{equipmentQuery.data.name}</h3>
              <h5 className="font-normal text-sm text-zinc-400">{equipmentQuery.data.observation}</h5>
            </div>
          )}
          {equipmentQuery.isLoading && (
            <div className="flex flex-col gap-y-4">
              <Skeleton className="w-full h-8 rounded-full animate-pulse bg-zinc-800" />
              <Skeleton className="w-full h-4 rounded-full animate-pulse bg-zinc-800" />
            </div>
          )}
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
                  <h3 className="font-medium text-base text-zinc-50">Está em carga?</h3>
                  <h5 className="font-normal text-xs text-zinc-400">
                    Se o equipamento está em carga, marque<br />
                    o botão como positivo.</h5>
                </div>
                <Switch onCheckedChange={(checked) => setIsInCharge(checked)} checked={isInCharge} />
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-medium text-base text-zinc-50">Condição</h3>
                  <h5 className="font-normal text-xs text-zinc-400">
                    Defina a condição do equipamento como<br />
                    NOVO, USADO ou INUTILIZÁVEL.
                  </h5>
                </div>
                <Select value={condition} onValueChange={(value) => setCondition(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma condição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Condição</SelectLabel>
                      <SelectItem value="NOVO">NOVO</SelectItem>
                      <SelectItem value="USADO">USADO</SelectItem>
                      <SelectItem value="DESCARGA">DESCARGA</SelectItem>
                      <SelectItem value="INUTILIZAVEL">INUTILIZÁVEL</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => handleUpdateEquipment()}>
                {isLoading ? (
                  <LoaderIcon className="w-4 h-4 animate-spin" />
                ) : "Salvar"}
              </Button>
            </Card>
          </div>
          <div className="flex flex-col gap-4">
            <Card className="w-full h-auto flex flex-col gap-2 items-center p-4">
              <div className="w-full flex items-center justify-between">
                <h1 className="font-medium text-sm">
                  Valor e número de série
                </h1>
              </div>
              <div className="w-full">
                {equipmentQuery.data && (
                  <div>
                    <h3 className="font-bold text-2xl">{price}</h3>
                    <p className="font-regular text-zinc-400 text-xs">{equipmentQuery.data.serialNumber}</p>
                  </div>
                )}
                {equipmentQuery.isLoading && (
                  <div className="flex flex-col gap-y-4">
                    <Skeleton className="w-full h-8 rounded-full animate-pulse bg-zinc-800" />
                    <Skeleton className="w-full h-4 rounded-full animate-pulse bg-zinc-800" />
                  </div>
                )}
              </div>
            </Card>
            <Card className="w-full h-auto flex flex-col gap-2 items-center p-4">
              <div className="w-full flex items-center justify-between">
                <h1 className="font-medium text-sm">
                  Disponível: {equipmentQuery.data && equipmentQuery.data.amount}
                </h1>
              </div>
              <div className="w-full">
                {equipmentQuery.data && (
                  <div>
                    <h3 className="font-bold text-2xl">{equipmentQuery.data.state}</h3>
                    <p className="font-regular text-zinc-400 text-xs">Quantidade em cautelas: {equipmentQuery.data.amountOut}</p>
                  </div>
                )}
                {equipmentQuery.isLoading && (
                  <div className="flex flex-col gap-y-4">
                    <Skeleton className="w-full h-8 rounded-full animate-pulse bg-zinc-800" />
                    <Skeleton className="w-full h-4 rounded-full animate-pulse bg-zinc-800" />
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}