"use client";

import { usePathname } from "next/navigation";

import { checkIsPublicRoute } from "@/libs/check-is-public-route";
import PrivateRoute from "../_components/private-routes";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();

	const isPublicPage = checkIsPublicRoute(pathname!);

	return (
		<>
			{isPublicPage && children}

			{!isPublicPage && 
        <PrivateRoute>
          {children}
        </PrivateRoute>
      }
		</>
	);
}