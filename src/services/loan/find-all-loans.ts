import { fetchWrapper } from "@/libs/fetch-wrapper";
import type { Loan } from "@/shared/models/loan";
import Cookie from "js-cookie";

interface FindAllLoansRequest {
  userType: string;
}

export const findAllLoans = async ({ userType }: FindAllLoansRequest) => {
  const response = await fetchWrapper<Promise<Loan[]>>(
    `loans?type=${userType}`,
    {
      method: "GET",
      headers: new Headers({
        "content-type": "application/json",
        Authorization: `Bearer ${Cookie.get("token")}`,
      }),
    }
  );

  return response;
};
