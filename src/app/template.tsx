'use client';

import { ThemeProvider } from '@material-tailwind/react';
import { NextAuthProvider } from './providers';

export default function RootTemplate({ children }: { children: React.ReactNode }) {
	return (
		<NextAuthProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</NextAuthProvider>
	);
}
