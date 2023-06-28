import { MainHeader } from '@@components';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-auto w-screen flex flex-col justify-stretch items-stretch grow bg-gray-200">
			<MainHeader />
			{children}
		</div>
	);
}
