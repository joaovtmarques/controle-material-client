
import Header from "./_components/header";

export default function PrivateLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
    <div>
      <Header />
      {children}
    </div>
	);
}