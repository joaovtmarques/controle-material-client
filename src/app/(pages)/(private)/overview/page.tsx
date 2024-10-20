"use client";

import InfoCard from "./_components/info-card";

import { findAllLoans } from "@/services/loan/find-all-loans";
import type { Loan } from "@/shared/models/loan";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "@tanstack/react-query";
import { BookText, BrickWall, Cable, DollarSign } from "lucide-react";
import { LoanForm } from "./_components/loan-form";
import LoansTable from "./_components/loans-table";
import type { Equipment } from "@/shared/models/equipment";
import { findEquipmentsInCharge } from "@/services/equipment/find-equipments-in-charge";
import { findEquipmentsInStock } from "@/services/equipment/find-equipments-in-stock";

export default function Overview() {
  const user = useUserStore(state => state.user);

  const getLoans = async (): Promise<Loan[]> => {
    const response = await findAllLoans({ userType: user!.type });
    return response;
  }
  const getEquipmentsInCharge = async (): Promise<Equipment[]> => {
    const response = await findEquipmentsInCharge({ userType: user!.type });
    return response;
  }
  const getEquipmentsInStock = async (): Promise<Equipment[]> => {
    const response = await findEquipmentsInStock({ userType: user!.type });
    return response;
  }

  const loansQuery = useQuery({
    queryKey: ["loans"],
    queryFn: getLoans,
  });
  const equipmentsInChargeQuery = useQuery({
    queryKey: ["equipmentsInCharge"],
    queryFn: getEquipmentsInCharge
  });
  const equipmentsInStockQuery = useQuery({
    queryKey: ["equipmentsInStock"],
    queryFn: getEquipmentsInStock
  });

  let price: string = "";
  if(equipmentsInChargeQuery.data) {
    let actualPrice = 0;
    for(let i = 0; i < equipmentsInChargeQuery.data!.length; i++) {
      actualPrice += Number(equipmentsInChargeQuery.data![i].price);
    }
    price = actualPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mt-8">
        <InfoCard
          isLoading={loansQuery.isLoading}
          title="Cautelas abertas"
          value={loansQuery.data?.filter(loan => loan.status === "ABERTO").length.toString() || ""}
          text={`${loansQuery.data?.length} cautelas registradas ao total`}
          icon={<BookText className="h-4 w-4 text-zinc-400" />}
        />
        <InfoCard
          isLoading={loansQuery.isLoading}
          title="Material em carga"
          value={equipmentsInChargeQuery.data?.length.toString() || ""}
          text={`${equipmentsInChargeQuery.data?.filter(equipment => equipment.condition === "BOM").length.toString()} em condição de uso`}
          icon={<Cable className="h-4 w-4 text-zinc-400" />}
        />
        <InfoCard
          isLoading={loansQuery.isLoading}
          title="Material em estoque"
          value={equipmentsInStockQuery.data?.length.toString() || ""}
          text={`${equipmentsInStockQuery.data?.filter(equipment => equipment.condition === "BOM").length.toString()} em condição de uso`}
          icon={<BrickWall className="h-4 w-4 text-zinc-400" />}
        />
        <InfoCard
          isLoading={loansQuery.isLoading}
          title="Valor total do material"
          value={price.toString() || ""}
          text="Referente ao material em carga"
          icon={<DollarSign className="h-4 w-4 text-zinc-400" />}
        />
      </div>
      <div className="flex items-center gap-4 mt-4">
        <LoanForm />
        <LoansTable loans={loansQuery.data!} />
      </div>
    </div>
  )
}