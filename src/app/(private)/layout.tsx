
import Header from "./_components/header";
import { Separator } from "@/components/ui/separator";

export default function PrivateLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
    <div>
      <Header />
      <Separator />
      {children}
    </div>
	);
}