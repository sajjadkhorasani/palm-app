import '../globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Fullstack App | Dashboard',
	description: 'Author: SaJJaD Khorasani - Dashboard module',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="mx-auto w-full h-full flex flex-col justify-stretch items-stretch grow">{children}</div>
			</body>
		</html>
	);
}
