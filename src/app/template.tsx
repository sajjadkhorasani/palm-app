'use client';

import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@material-tailwind/react';
import { NextAuthProvider } from './providers';

export default function RootTemplate({ children }: { children: React.ReactNode }) {
	return (
		<NextAuthProvider>
			<ThemeProvider>
				{children}
				<Toaster />
			</ThemeProvider>
		</NextAuthProvider>
	);
}
