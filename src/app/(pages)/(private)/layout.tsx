
import Header from "./_components/header";
import PageHeader from "./_components/page-header";

export default function PrivateLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
    <div>
      <Header />
      <PageHeader />
      {children}
    </div>
	);
}