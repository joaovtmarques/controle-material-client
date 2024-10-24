import { fetchWrapper } from "@/libs/fetch-wrapper";
import type { Loan } from "@/shared/models/loan";
import Cookie from "js-cookie";

interface FindLoansByStatusRequest {
  id: number;
}

export const findLoanById = async ({ id }: FindLoansByStatusRequest) => {
  const response = await fetchWrapper<Promise<Loan | null>>(`loans/${id}`, {
    method: "GET",
    headers: new Headers({
      "content-type": "application/json",
      Authorization: `Bearer ${Cookie.get("token")}`,
    }),
  });

  return response;
};
