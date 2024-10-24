import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
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
  SelectValue
} from "@/components/ui/select";
import { oms } from "@/constants/om-su";
import { ranks } from "@/constants/rank";
import { addReceiver } from "@/services/receivers/add-receiver";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface Inputs {
  name: string;
  warName: string;
  rank: string;
  company: string;
  cpf: string;
  telephone: string;
}

export default function ReceiverForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    await addReceiver({
      ...data
    }).then((response) => {
      setIsLoading(false);
      if (response) {
        toast("Recebedor criado com sucesso.", {
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
    <DialogContent className={"sm:max-w-[425px] overflow-y-scroll max-h-screen"}>
      <DialogHeader>
        <DialogTitle>Adicionar recebedor</DialogTitle>
        <DialogDescription>
          Preencha os campos para registrar um recebedor
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name" className="text-left">
              Nome completo
            </Label>
            <Input
              {...register("name")}
              id="name"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="pg" className="text-left">
              Posto/Graduação
            </Label>
            <Controller
                control={control}
                name="rank"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um posto/graduação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Posto/Graduação</SelectLabel>
                        {ranks.map((rank, index) => (
                          <SelectItem key={index} value={rank}>{rank}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
              )} />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="warName" className="text-left">
              Nome de guerra
            </Label>
            <Input
              {...register("warName")}
              id="warName"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-left">
              OM/Su
            </Label>
            <Controller
                control={control}
                name="company"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma OM/Su" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>OM/Su</SelectLabel>
                        {oms.map((om, index) => (
                          <SelectItem key={index} value={om}>{om}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
              )} />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="cpf" className="text-left">
              CPF
            </Label>
            <Input
              {...register("cpf")}
              id="cpf"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="telephone" className="text-left">
              Telefone
            </Label>
            <Input  
              {...register("telephone")}
              id="telephone"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">
            {isLoading ? <LoaderIcon className="mr-2 h-4 w-4 animate-spin" /> : "Salvar"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>  
  )
}