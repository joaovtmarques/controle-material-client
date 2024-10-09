import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function Loan() {
  return (
    <div className="p-8 flex gap-16">
      <div>
        <Button>
          Fazer download
        </Button>
      </div>
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
                  <h3 className="font-medium text-base text-zinc-50">Status - FECHADO</h3>
                  <h5 className="font-normal text-xs text-zinc-400">Se o material já foi devolvido ou não será<br /> devolvido, marque a cautela como FECHADO.</h5>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between gap-x-4">
                <div>
                  <h3 className="font-medium text-base text-zinc-50">Alteração</h3>
                  <h5 className="font-normal text-xs text-zinc-400">Marque se houve alteração com o equipamento<br /> na descautela do material.</h5>
                </div>
                <Switch />
              </div>
            </Card>
            <Card className="flex flex-col p-6 gap-6">
              <div>
                <h3 className="font-medium text-base text-zinc-50">Responsáveis</h3>
                <h5 className="font-normal text-xs text-zinc-400">Quem registrou a cautela e quem recebeu</h5>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>JV</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-base text-zinc-50">Sd Vitor Silva</h3>
                    <h5 className="font-normal text-xs text-zinc-400">CCAp</h5>
                  </div>
                </div>
                <Card className="text-sm text-zinc-50 font-medium px-2 py-[6px]">
                  Registrou a cautela
                </Card>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>JV</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-base text-zinc-50">Sd Vitor Silva</h3>
                    <h5 className="font-normal text-xs text-zinc-400">CCAp</h5>
                  </div>
                </div>
                <Card className="text-sm text-zinc-50 font-medium px-2 py-[6px]">
                  Recebeu o material
                </Card>
              </div>
            </Card>
          </div>
          <div className="flex flex-col gap-4">
            <Card className="w-full h-auto flex flex-col gap-2 items-center p-4">
              <div className="w-full flex items-center justify-between">
                <h1 className="font-medium text-sm">
                  Equipamento - CARGA - USADO
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
                  Cautela:  22-09-2024
                </h1>
              </div>
              <div className="w-full">
                <h3 className="font-bold text-2xl">ABERTO</h3>
                <p className="font-regular text-zinc-400 text-xs">Devolução: sem previsão</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}