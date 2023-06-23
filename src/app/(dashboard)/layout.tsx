import { MainHeader } from '@@components';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-auto w-full h-full flex flex-col justify-stretch items-stretch grow bg-white">
			<MainHeader />
			{children}
		</div>
	);
}
