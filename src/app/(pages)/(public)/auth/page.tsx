/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useEffect } from "react";
import Cookie from "js-cookie";

import AuthForm from "./_components/auth-form";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";

export default function Auth() {
  const { push } = useRouter();

  const token = Cookie.get("token");

  useEffect(() => {
    token && push(APP_ROUTES.private.overview.name);
  }, [token, push]);

  return (
    <div>
      <AuthForm />
    </div>
  )
}