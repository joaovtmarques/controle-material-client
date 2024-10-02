import { Calendar } from "lucide-react";

import { cards } from "@/constants/cards";
import { Card } from "@/components/ui/card";
import { day, month } from "@/constants/date";
import InfoCard from "./_components/info-card";
import { Button } from "@/components/ui/button";
import { LoanForm } from "./_components/loan-form";
import LoansTable from "./_components/loans-table";

export default function Overview() {

  function getDate() {
    const data = new Date(Date.now());

    const d = day[data.getDay()];
    const date = data.getDate();
    const m = month[data.getMonth()];
    const year = data.getFullYear();

    return `${d}, ${date} de ${m} de ${year}`;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-zinc-50">Painel</h1>
        <div className="flex items-center gap-4">
          <Card className="w-max flex gap-2 items-center border border-zinc-800 h-12 px-4">
            <Calendar />
            <h5 className="font-medium text-sm">{getDate()}</h5>
          </Card>
          <Button className="font-medium text-sm h-12">Registrar cautela</Button>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-8">
        {cards.map((card, index) => (
          <InfoCard
            key={index}
            title={card.title}
            value={card.value}
            text={card.text}
            icon={<card.icon className="h-4 w-4 text-zinc-400" />}
          />
        ))}
      </div>
      <div className="flex items-center gap-4 mt-4">
        <LoanForm />
        <LoansTable />
      </div>
    </div>
  )
}