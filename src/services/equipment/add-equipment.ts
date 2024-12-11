import { fetchWrapper } from "@/libs/fetch-wrapper";
import type { Loan } from "@/shared/models/loan";
import Cookie from "js-cookie";

interface AddEquipmentRequest {
  name: string;
  amount: number;
  serialNumber: string;
  price: string;
  observation: string;
  condition: string;
  isInCharge: boolean;
  categoryId: number;
  type: string;
  state: string;
  amountOut: number;
  owner: string;
  isTemporary: boolean;
}

export const addEquipment = async ({
  name,
  amount,
  serialNumber,
  price,
  observation,
  condition,
  isInCharge,
  categoryId,
  type,
  state,
  amountOut,
  owner,
  isTemporary,
}: AddEquipmentRequest) => {
  const response = await fetchWrapper<Promise<Loan>>(`equipments`, {
    method: "POST",
    body: JSON.stringify({
      name,
      amount,
      serialNumber,
      price,
      observation,
      condition,
      isInCharge,
      categoryId,
      type,
      state,
      amountOut,
      owner,
      isTemporary,
    }),
    headers: new Headers({
      "content-type": "application/json",
      Authorization: `Bearer ${Cookie.get("token")}`,
    }),
  });

  return response;
};
