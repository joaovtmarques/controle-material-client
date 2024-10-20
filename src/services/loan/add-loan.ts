import { fetchWrapper } from "@/libs/fetch-wrapper";
import type { Loan } from "@/shared/models/loan";
import Cookie from "js-cookie";

interface AddLoansRequest {
  loanData: {
    equipmentsId: number[];
    receiverId: number;
    devolutionDate: string;
    amount: number;
    observation: string;
    type: string;
    lenderId: number;
    alteration: boolean;
  };
}

export const addLoan = async ({ loanData }: AddLoansRequest) => {
  const response = await fetchWrapper<Promise<Loan>>(`loans`, {
    method: "POST",
    body: JSON.stringify(loanData),
    headers: new Headers({
      "content-type": "application/json",
      Authorization: `Bearer ${Cookie.get("token")}`,
    }),
  });

  return response;
};
