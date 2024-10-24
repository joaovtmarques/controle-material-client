import { fetchWrapper } from "@/libs/fetch-wrapper";
import type { Category } from "@/shared/models/category";
import Cookie from "js-cookie";

interface FindAllCategoriesRequest {
  userType: string;
}

export const findAllCategories = async ({
  userType,
}: FindAllCategoriesRequest) => {
  const response = await fetchWrapper<Promise<Category[]>>(
    `categories?type=${userType}`,
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
