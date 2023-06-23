import { Inter } from 'next/font/google';
import { Metadata } from 'next';

import '@@assets/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Palm App',
	description: 'Created By SaJJaD Khorasani, https://github.com/sajjadkhorasani',
	viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
