import { fetchWrapper } from "@/libs/fetch-wrapper";
import Cookie from "js-cookie";

interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const auth = async ({ email, password, rememberMe }: LoginRequest) => {
  const response = await fetchWrapper<Response>("auth", {
    method: "POST",
    body: JSON.stringify({
      email: email.toString(),
      password: password.toString(),
    }),
    headers: new Headers({ "content-type": "application/json" }),
  });

  const { token, user } = await response.json();

  if (rememberMe) {
    const hours = new Date(
      new Date().getTime() + 1 * 60 * 60 * 1000 + 50 * 60 * 1000
    );
    Cookie.set("token", token, { expires: hours });
  } else {
    Cookie.set("token", token);
  }

  return { token, user };
};
