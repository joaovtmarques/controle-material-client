"use client";

import { usePathname } from "next/navigation";

import { checkIsPublicRoute } from "@/libs/check-is-public-route";
import PrivateRoute from "../_components/private-routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libs/query-client";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();

	const isPublicPage = checkIsPublicRoute(pathname!);

	return (
		<QueryClientProvider client={queryClient}>
			{isPublicPage && children}

			{!isPublicPage && 
        <PrivateRoute>
          {children}
        </PrivateRoute>
      }
		</QueryClientProvider>
	);
}