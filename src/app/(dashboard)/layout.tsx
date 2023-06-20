import { MainHeader } from '@@components';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<MainHeader />
			<div className="mx-auto w-full h-full flex flex-col justify-stretch items-stretch grow">{children}</div>
		</>
	);
}
