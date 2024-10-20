import { fetchWrapper } from "@/libs/fetch-wrapper";
import type { Receiver } from "@/shared/models/receiver";
import Cookie from "js-cookie";

export const findAllReceivers = async () => {
  const response = await fetchWrapper<Promise<Receiver[]>>(`receivers`, {
    method: "GET",
    headers: new Headers({
      "content-type": "application/json",
      Authorization: `Bearer ${Cookie.get("token")}`,
    }),
  });

  return response;
};
