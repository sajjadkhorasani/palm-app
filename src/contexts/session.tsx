'use client';

import { Prisma } from '@prisma/client';
import { createContext } from 'react';

export const SessionContext = createContext<Prisma.UserGetPayload<true> | null>(null);

export const SessionProvider = ({
	children,
	value = null,
}: {
	children: React.ReactNode;
	value: Prisma.UserGetPayload<true> | null;
}) => {
	return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
