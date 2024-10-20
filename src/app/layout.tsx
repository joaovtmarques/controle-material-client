import "./globals.css";

import { Inter } from "@next/font/google";
import type { Metadata } from "next";

const inter = Inter({
  weight: ['400', '500', '700', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
	title: "Controle de Material",
	description: "Web app para controle de material e estoque.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} dark select-none`}>
				<link rel="icon" href="/images/favicon.ico" sizes="any" />
				{children}
			</body>
		</html>
	);
}