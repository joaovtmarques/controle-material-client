import { fetchWrapper } from "@/libs/fetch-wrapper";
import type { Receiver } from "@/shared/models/receiver";
import Cookie from "js-cookie";

interface AddReceiverRequest {
  name: string;
  warName: string;
  rank: string;
  company: string;
  cpf: string;
  telephone: string;
}

export const addReceiver = async ({
  name,
  warName,
  rank,
  company,
  cpf,
  telephone,
}: AddReceiverRequest) => {
  const response = await fetchWrapper<Promise<Receiver>>(`receivers`, {
    method: "POST",
    body: JSON.stringify({
      name,
      warName,
      rank,
      company,
      cpf,
      telephone,
    }),
    headers: new Headers({
      "content-type": "application/json",
      Authorization: `Bearer ${Cookie.get("token")}`,
    }),
  });

  return response;
};
