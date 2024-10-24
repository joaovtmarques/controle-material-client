import { fetchWrapper } from "@/libs/fetch-wrapper";
import type { Loan } from "@/shared/models/loan";
import Cookie from "js-cookie";

interface UpdateLoanRequest {
  id: number;
  status: string;
  alteration: boolean;
}

export const updateLoan = async ({
  id,
  status,
  alteration,
}: UpdateLoanRequest) => {
  const response = await fetchWrapper<Promise<Loan>>(`loans/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      status,
      alteration,
    }),
    headers: new Headers({
      "content-type": "application/json",
      Authorization: `Bearer ${Cookie.get("token")}`,
    }),
  });

  return response;
};
