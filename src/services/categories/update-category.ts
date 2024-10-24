import { fetchWrapper } from "@/libs/fetch-wrapper";
import type { Category } from "@/shared/models/category";
import Cookie from "js-cookie";

interface UpdateCategoryRequest {
  id: number;
  name: string;
}

export const updateCategory = async ({ id, name }: UpdateCategoryRequest) => {
  const response = await fetchWrapper<Promise<Category>>(`categories/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name,
    }),
    headers: new Headers({
      "content-type": "application/json",
      Authorization: `Bearer ${Cookie.get("token")}`,
    }),
  });

  return response;
};
