import { MainHeader } from '@@components';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-auto w-screen min-h-screen flex flex-col justify-stretch items-stretch grow bg-gray-200">
			<MainHeader />
			{children}
		</div>
	);
}
