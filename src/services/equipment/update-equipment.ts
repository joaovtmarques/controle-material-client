import { fetchWrapper } from "@/libs/fetch-wrapper";
import type { Loan } from "@/shared/models/loan";
import Cookie from "js-cookie";

interface UpdateEquipmentRequest {
  id: number;
  condition: string;
  isInCharge: boolean;
}

export const updateEquipment = async ({
  id,
  condition,
  isInCharge,
}: UpdateEquipmentRequest) => {
  const response = await fetchWrapper<Promise<Loan>>(`equipments/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      condition,
      isInCharge,
    }),
    headers: new Headers({
      "content-type": "application/json",
      Authorization: `Bearer ${Cookie.get("token")}`,
    }),
  });

  return response;
};
