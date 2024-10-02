
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DatePicker from "./date-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account"

export function LoanForm() {
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
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um recebedor" />
                </SelectTrigger>
                <SelectContent id="receiver">
                  <SelectGroup>
                    <SelectLabel>Recebedor</SelectLabel>
                    <SelectItem value="apple">João</SelectItem>
                    <SelectItem value="banana">Vitor</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Quantidade</Label>
              <Input id="amount" placeholder="Exemplo: 1" required type="number" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="observation">Observação</Label>
            <Input
              id="observation"
              type="text"
              placeholder="Adicione uma observação"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="devolutionDate">Data de devolução</Label>
            <DatePicker />
          </div>
          <div className="grid gap-2">
              <Label htmlFor="equipment">Equipamento</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um equipamento" />
                </SelectTrigger>
                <SelectContent id="equipment">
                  <SelectGroup>
                    <SelectLabel>Equipamento/Material</SelectLabel>
                    <SelectItem value="apple">João</SelectItem>
                    <SelectItem value="banana">Vitor</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          <Button type="submit" className="w-full">
            Registrar cautela
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
