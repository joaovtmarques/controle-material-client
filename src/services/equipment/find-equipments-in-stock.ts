import { fetchWrapper } from "@/libs/fetch-wrapper";
import type { Equipment } from "@/shared/models/equipment";
import Cookie from "js-cookie";

interface FindAllEquipmentsInCharge {
  userType: string;
}

export const findEquipmentsInStock = async ({
  userType,
}: FindAllEquipmentsInCharge) => {
  const response = await fetchWrapper<Promise<Equipment[]>>(
    `equipments/in-stock?type=${userType}`,
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
