import { fetchWrapper } from "@/libs/fetch-wrapper";
import Cookie from "js-cookie";

interface GetDownloadLinkRequest {
  filePath: string;
}

export const getDownloadLink = async ({ filePath }: GetDownloadLinkRequest) => {
  const response = await fetchWrapper<Blob>(
    `loans/download?filePath=${filePath}`,
    {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${Cookie.get("token")}`,
      }),
    },
    false,
    true
  );

  return response;
};
