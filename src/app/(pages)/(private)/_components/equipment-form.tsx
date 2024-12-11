import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/libs/utils";
import { findAllCategories } from "@/services/categories/find-all-categories";
import { addEquipment } from "@/services/equipment/add-equipment";
import type { Category } from "@/shared/models/category";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { CalendarIcon, LoaderIcon } from "lucide-react";
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
  lender: string;
  receiver: string;
  loanDate: string;
}

export default function EquipmentForm() {
  const user = useUserStore((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [isInCharge, setIsInCharge] = useState("NAO");
  const [date, setDate] = useState<Date>();

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
    if (
      data.name &&
      data.amount &&
      data.serialNumber &&
      data.price &&
      data.observation &&
      data.condition &&
      data.isInCharge &&
      data.categoryId &&
      user.type &&
      data.categoryId &&
      data.owner &&
      data.isTemporary &&
      data.lender &&
      data.receiver
    ) {
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
        lender: data.lender,
        receiver: data.receiver,
        loanDate: date
          ? format(date!, "dd-MM-yyyy", { locale: ptBR })
          : "Data inválida",
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
          setIsLoading(false);
          toast.error(error.message);
        });
    } else {
      setIsLoading(false);
      toast.error("Preencha todos os campos.");
    }
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
            <div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="owner" className="text-left">
                  Dono do equipamento (Ex: 12º Cia Com Amv)?
                </Label>
                <Input
                  {...register("owner")}
                  id="owner"
                  className="col-span-3"
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="lender" className="text-left">
                  Responsável pela cautela
                </Label>
                <Input
                  {...register("lender")}
                  id="lender"
                  className="col-span-3"
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="receiver" className="text-left">
                  Quem recebeu o equipamento?
                </Label>
                <Input
                  {...register("receiver")}
                  id="receiver"
                  className="col-span-3"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="devolutionDate">Data de cautela</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
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
