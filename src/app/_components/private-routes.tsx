import { APP_ROUTES } from "@/constants/app-routes";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import Cookie from "js-cookie";

interface PrivateRouteProps {
	children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
	const { push } = useRouter();
	const userToken = Cookie.get("token");

	if (!userToken) {
		push(APP_ROUTES.public.home);
	}

	return (
		<>
			{!userToken && null}
			{userToken && children}
		</>
	);
}