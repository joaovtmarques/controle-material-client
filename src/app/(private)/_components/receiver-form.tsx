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

export default function ReceiverForm() {
  return (
    <DialogContent className={"sm:max-w-[425px] overflow-y-scroll max-h-screen"}>
      <DialogHeader>
        <DialogTitle>Adicionar recebedor</DialogTitle>
        <DialogDescription>
          Preencha os campos para registrar um recebedor
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="flex flex-col gap-4">
          <Label htmlFor="name" className="text-left">
            Nome compleeto
          </Label>
          <Input
            id="name"
            className="col-span-3"
          />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="pg" className="text-left">
            Posto/Graduação
          </Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um posto/graduação" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Posto/Graduação</SelectLabel>
                <SelectItem value="Cel">Cel</SelectItem>
                <SelectItem value="TC">TC</SelectItem>
                <SelectItem value="Maj">Maj</SelectItem>
                <SelectItem value="Cap">Cap</SelectItem>
                <SelectItem value="1 Ten">1 Ten</SelectItem>
                <SelectItem value="2 Ten">2 Ten</SelectItem>
                <SelectItem value="Asp">Asp</SelectItem>
                <SelectItem value="S Ten">S Ten</SelectItem>
                <SelectItem value="1 Sgt">1 Sgt</SelectItem>
                <SelectItem value="2 Sgt">2 Sgt</SelectItem>
                <SelectItem value="3 Sgt">3 Sgt</SelectItem>
                <SelectItem value="Cb">Cb</SelectItem>
                <SelectItem value="Sd EP">Sd EP</SelectItem>
                <SelectItem value="Sd EV">Sd EV</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="warName" className="text-left">
            Nome de guerra
          </Label>
          <Input
            id="warName"
            className="col-span-3"
          />
        </div>
        <div className="flex flex-col gap-4">
          <Label className="text-left">
            OM/Su
          </Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma OM/Su" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>OM/Su</SelectLabel>
                <SelectItem value="6 BI Amv">6 BI Amv</SelectItem>
                <SelectItem value="Cia Cmdo da Bda">Cia Cmdo da Bda</SelectItem>
                <SelectItem value="QG">QG</SelectItem>
                <SelectItem value="Base Adm">Base Adm</SelectItem>
                <SelectItem value="12 Cia Com Amv">12 Cia Com Amv</SelectItem>
                <SelectItem value="12 Pel PE">12 Pel PE</SelectItem>
                <SelectItem value="Outro">Outro</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="cpf" className="text-left">
            CPF
          </Label>
          <Input
            id="cpf"
            className="col-span-3"
          />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="telephone" className="text-left">
            Telefone
          </Label>
          <Input
            id="telephone"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Salvar</Button>
      </DialogFooter>
    </DialogContent>  
  )
}