import Cookie from "js-cookie";

interface DeleteEquipmentRequest {
  id: number;
}

export const deleteEquipment = async ({ id }: DeleteEquipmentRequest) => {
  const response = await fetch(`http://localhost:8080/api/equipments/${id}`, {
    method: "DELETE",
    headers: new Headers({
      "content-type": "application/json",
      Authorization: `Bearer ${Cookie.get("token")}`,
    }),
  });

  return response;
};
