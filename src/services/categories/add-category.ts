import { fetchWrapper } from "@/libs/fetch-wrapper";
import type { Category } from "@/shared/models/category";
import Cookie from "js-cookie";

interface AddCategoryRequest {
  userType: string;
  name: string;
}

export const addCategory = async ({ userType, name }: AddCategoryRequest) => {
  const response = await fetchWrapper<Promise<Category>>(`categories`, {
    method: "POST",
    body: JSON.stringify({
      name,
      type: userType,
    }),
    headers: new Headers({
      "content-type": "application/json",
      Authorization: `Bearer ${Cookie.get("token")}`,
    }),
  });

  return response;
};
