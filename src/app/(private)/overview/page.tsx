
import { cards } from "@/constants/cards";
import InfoCard from "./_components/info-card";

import { LoanForm } from "./_components/loan-form";
import LoansTable from "./_components/loans-table";

export default function Overview() {
  return (
    <div className="p-8">
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