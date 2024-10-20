import { APP_ROUTES } from "@/constants/app-routes";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import Cookie from "js-cookie";
import { useState, useEffect } from 'react';

interface PrivateRouteProps {
	children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
	const { push } = useRouter();
	const userToken = Cookie.get("token");
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!userToken) {
		push(APP_ROUTES.public.home);
	}

	return (
		<>
			{isClient && userToken ? children : 
				<div className="relative w-16 h-16 bg-gray-200 rounded-full animate-spin">
					<div className="absolute inset-0 flex items-center justify-center rounded-full">
						<div className="h-4 w-4 bg-blue-500 rounded-full"></div>
					</div>
				</div>
			}
		</>
	);
}