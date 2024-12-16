import { fetchWrapper } from "@/libs/fetch-wrapper";
import Cookie from "js-cookie";

export const createLoanReady = async ({
  userType,
}: {
  userType: string;
}): Promise<string> => {
  const response = await fetch(
    `http://localhost:8080/api/loan-doc/ready?type=${userType}`,
    {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${Cookie.get("token")}`,
      }),
    }
  );

  return await response.text();
};

export const getLoanReady = async ({ filePath }: { filePath: string }) => {
  const response = await fetchWrapper<Blob>(
    `loans/loan-ready/download?filePath=${filePath}`,
    {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${Cookie.get("token")}`,
      }),
    },
    false,
    true
  );

  return response;
};
