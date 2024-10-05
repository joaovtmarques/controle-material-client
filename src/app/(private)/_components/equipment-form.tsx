import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

export default function EquipmentForm() {
  return (
    <DialogContent className={"sm:max-w-[425px] overflow-y-scroll max-h-screen"}>
      <DialogHeader>
        <DialogTitle>Adicionar categoria</DialogTitle>
        <DialogDescription>
          Preencha o nome da categoria para registrá-la
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="flex flex-col gap-4">
          <Label htmlFor="name" className="text-left">
            Nome do equipamento
          </Label>
          <Input
            id="name"
            className="col-span-3"
          />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="name" className="text-left">
            Quantidade disponível
          </Label>
          <Input
            id="name"
            className="col-span-3"
            type="number"
          />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="name" className="text-left">
            Número de série
          </Label>
          <Input
            id="name"
            className="col-span-3"
          />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="name" className="text-left">
            Preço
          </Label>
          <Input
            id="name"
            className="col-span-3"
          />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="name" className="text-left">
            Observação
          </Label>
          <Input
            id="name"
            className="col-span-3"
          />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="name" className="text-left">
            Condição
          </Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um recebedor" />
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
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="name" className="text-left">
            Está em carga?
          </Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um recebedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Condição</SelectLabel>
                <SelectItem value="SIM">SIM</SelectItem>
                <SelectItem value="NAO">NÃO</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Salvar</Button>
      </DialogFooter>
    </DialogContent>  
  )
}