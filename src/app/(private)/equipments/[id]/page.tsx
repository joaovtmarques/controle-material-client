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
import { Switch } from "@/components/ui/switch";

export default function Equipment() {
  return (
    <div className="p-8 flex gap-16">
      <div className="w-auto flex flex-col gap-4">
        <header>
          <h3 className="font-medium text-lg text-zinc-50">Computador Dell I5 8gb</h3>
          <h5 className="font-normal text-sm text-zinc-400">Sem observação</h5>
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
                <Switch />
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-medium text-base text-zinc-50">Condição</h3>
                  <h5 className="font-normal text-xs text-zinc-400">
                    Defina a condição do equipamento como<br />
                    NOVO, USADO ou INUTILIZÁVEL.
                  </h5>
                </div>
                <Select>
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
              </div>
              <Button>Salvar</Button>
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
                <h3 className="font-bold text-2xl">R$5.000,00</h3>
                <p className="font-regular text-zinc-400 text-xs">XCLDFHN3KEDHD92BJDKS</p>
              </div>
            </Card>
            <Card className="w-full h-auto flex flex-col gap-2 items-center p-4">
              <div className="w-full flex items-center justify-between">
                <h1 className="font-medium text-sm">
                  Disponível: 1
                </h1>
              </div>
              <div className="w-full">
                <h3 className="font-bold text-2xl">EM ESTOQUE</h3>
                <p className="font-regular text-zinc-400 text-xs">Quantidade em cautelas: 3</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}