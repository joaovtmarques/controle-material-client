import { fetchWrapper } from "@/libs/fetch-wrapper";
import type { Equipment } from "@/shared/models/equipment";
import Cookie from "js-cookie";

interface FindEquipmentByIdRequest {
  id: number;
}

export const findEquipmentById = async ({ id }: FindEquipmentByIdRequest) => {
  const response = await fetchWrapper<Promise<Equipment | null>>(
    `equipments/${id}`,
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
