"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/libs/utils";
import { findAllEquipments } from "@/services/equipment/find-all-equipments";
import { addLoan } from "@/services/loan/add-loan";
import { findAllReceivers } from "@/services/receivers/find-all-receivers";
import type { Equipment } from "@/shared/models/equipment";
import type { Receiver } from "@/shared/models/receiver";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale/pt-BR';
import { Calendar as CalendarIcon, LoaderIcon } from "lucide-react";
import { useState } from "react";

export function LoanForm() {
  const user = useUserStore(state => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [receiverId, setReceiverId] = useState<string | undefined>();
  const [lenderId, setLenderId] = useState(user.id);
  const [amount, setAmount] = useState(0);
  const [observation, setObservation] = useState("");
  const [type, setType] = useState(user.type);
  const [alteration, setAlteration] = useState(false);
  const [date, setDate] = useState<Date>()
  const [devolutionDate, setDevolutionDate] = useState();
  const [equipmentsId, setEquipmentsId] = useState<string | undefined>();

  const onSubmit = async () => {
    setIsLoading(true);
    await addLoan({
      loanData: {
        amount,
        observation,
        type,
        lenderId,
        receiverId: parseInt(receiverId!),
        alteration,
        devolutionDate: format(date!, "dd-MM-yyyy", { locale: ptBR }),
        equipmentsId: [parseInt(equipmentsId!)]
      }
    }).then(
      (response) => {
        console.log(response);
        window.location.reload()
      }
    );
    setIsLoading(false);
  }

  const getReceivers = async (): Promise<Receiver[]> => {
    const response = await findAllReceivers();
    return response;
  }

  const getEquipments = async (): Promise<Equipment[]> => {
    const response = await findAllEquipments({ userType: user!.type });
    return response;
  }

  const receiversQuery = useQuery({
    queryKey: ["receivers"],
    queryFn: getReceivers,
  });
  const equipmentsQuery = useQuery({
    queryKey: ["equipments"],
    queryFn: getEquipments,
  });

  return (
    <Card className="mx-auto w-7/12">
      <CardHeader>
        <CardTitle className="text-xl">Registrar cautela</CardTitle>
        <CardDescription>
          Preencha os campos para registrar uma nova cautela
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="receiver">Recebedor</Label>
              <Select value={receiverId} onValueChange={(value: string | undefined) => setReceiverId(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um recebedor" />
                </SelectTrigger>
                <SelectContent id="receiver" >
                  <SelectGroup>
                    <SelectLabel>Recebedor</SelectLabel>
                    {receiversQuery.data && receiversQuery.data.map((receiver) => (
                      <SelectItem value={receiver.id.toString()} key={receiver.id}>{receiver.rank+" "+receiver.warName}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Quantidade</Label>
              <Input onChange={value => setAmount(parseInt(value.target.value))} id="amount" placeholder="Exemplo: 1" required type="number" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="observation">Observação</Label>
            <Input
              onChange={value => setObservation(value.target.value)}
              id="observation"
              type="text"
              placeholder="Adicione uma observação"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="devolutionDate">Data de devolução</Label>
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
                  {date ? format(date, "PPP",  { locale: ptBR }) : <span>Selecione uma data</span>}
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
          <div className="grid gap-2">
              <Label htmlFor="equipment">Equipamento</Label>
              <Select value={equipmentsId} onValueChange={(value: string | undefined) => setEquipmentsId(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um equipamento" />
                </SelectTrigger>
                <SelectContent id="equipment">
                  <SelectGroup>
                    <SelectLabel>Equipamento/Material</SelectLabel>
                    {equipmentsQuery.data && equipmentsQuery.data.map((equipment) => (
                      <SelectItem value={equipment.id.toString()} key={equipment.id}>{equipment.name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          <Button onClick={() => onSubmit()} className="w-full">
            {isLoading ? <LoaderIcon className="animate-spin" /> : "Registrar cautela"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
