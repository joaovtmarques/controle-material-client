import { fetchWrapper } from "@/libs/fetch-wrapper";
import type { Loan } from "@/shared/models/loan";
import Cookie from "js-cookie";

interface FindLoansByStatusRequest {
  userType: string;
  status: string;
}

export const findLoansByStatus = async ({
  userType,
  status,
}: FindLoansByStatusRequest) => {
  const response = await fetchWrapper<Promise<Loan[]>>(
    `loans/open?status=${status}&type=${userType}`,
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
