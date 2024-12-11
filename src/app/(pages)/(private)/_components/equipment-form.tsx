import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { findAllCategories } from "@/services/categories/find-all-categories";
import { addEquipment } from "@/services/equipment/add-equipment";
import type { Category } from "@/shared/models/category";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface Inputs {
  name: string;
  amount: string;
  serialNumber: string;
  price: string;
  observation: string;
  condition: string;
  isInCharge: string;
  categoryId: string;
  isTemporary: string;
  owner: string;
}

export default function EquipmentForm() {
  const user = useUserStore((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [isInCharge, setIsInCharge] = useState("NAO");

  const getCategories = async (): Promise<Category[]> => {
    const response = await findAllCategories({ userType: user!.type });
    return response;
  };

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { register, handleSubmit, control } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    await addEquipment({
      ...data,
      categoryId: Number(data.categoryId),
      amount: Number(data.amount),
      isInCharge: isInCharge === "SIM" ? true : false,
      isTemporary: data.isTemporary === "SIM" ? true : false,
      amountOut: 0,
      type: user!.type,
      state: "EM_ESTOQUE",
      owner: data.owner ? data.owner : user!.type,
    })
      .then((response) => {
        setIsLoading(false);
        if (response) {
          toast("Equipamento criado com sucesso.", {
            description:
              "Clique em confirmar para atualizar a página e ver as mudanças.",
            action: {
              label: "Confirmar",
              onClick: () => window.location.reload(),
            },
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <DialogContent
      className={"sm:max-w-[425px] overflow-y-scroll max-h-screen"}
    >
      <DialogHeader>
        <DialogTitle>Adicionar equipamento</DialogTitle>
        <DialogDescription>
          Preencha os campos abaixo para registrar um equipamento
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name" className="text-left">
              Nome do equipamento
            </Label>
            <Input {...register("name")} id="name" className="col-span-3" />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="amount" className="text-left">
              Quantidade disponível
            </Label>
            <Input
              {...register("amount")}
              id="amount"
              className="col-span-3"
              type="number"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="serialNumber" className="text-left">
              Número de série
            </Label>
            <Input
              {...register("serialNumber")}
              id="serialNumber"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="price" className="text-left">
              Preço
            </Label>
            <Input {...register("price")} id="price" className="col-span-3" />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="observation" className="text-left">
              Observação
            </Label>
            <Input
              {...register("observation")}
              id="observation"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="name" className="text-left">
              Condição
            </Label>
            <Controller
              control={control}
              name="condition"
              render={({ field }) => (
                <Select onValueChange={field.onChange} {...field}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma condição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Condição</SelectLabel>
                      <SelectItem value="NOVO">NOVO</SelectItem>
                      <SelectItem value="USADO">USADO</SelectItem>
                      <SelectItem value="INUTILIZAVEL">INUTILIZÁVEL</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="name" className="text-left">
              Está em carga?
            </Label>
            <Select onValueChange={setIsInCharge}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Está em carga?" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Está em carga?</SelectLabel>
                  <SelectItem value="SIM">SIM</SelectItem>
                  <SelectItem value="NAO">NAO</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {isInCharge === "NAO" && (
            <div className="flex flex-col gap-4">
              <Label htmlFor="name" className="text-left">
                Dono do equipamento (Ex: 12º Cia Com Amv)?
              </Label>
              <Input {...register("owner")} id="owner" className="col-span-3" />
            </div>
          )}
          <div className="flex flex-col gap-4">
            <Label htmlFor="name" className="text-left">
              Categoria
            </Label>
            <Controller
              control={control}
              name="categoryId"
              render={({ field }) => (
                <Select onValueChange={field.onChange} {...field}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Selecione uma categoria</SelectLabel>
                      {categoriesQuery.data &&
                        categoriesQuery.data?.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">
            {isLoading ? (
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Salvar"
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
