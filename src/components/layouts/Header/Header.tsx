'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { color } from '@material-tailwind/react/types/components/button';
import { usePathname } from 'next/navigation';
import { Badge, IconButton, Navbar } from '@material-tailwind/react';
import { BuildingStorefrontIcon, HomeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

import { useBasketSlice } from '@@store';

import { HamburgerMenu } from './HamburgerMenu';

export function MainHeader() {
	const pathname = usePathname();
	const { items } = useBasketSlice();

	const activeColor = (path: string) => (pathname === path ? 'blue' : 'gray');

	return (
		<Navbar className="mx-auto sticky top-2 p-2 my-4 z-10 lg:rounded-full lg:pl-6">
			<div className="relative mx-auto flex items-center text-blue-gray-900 gap-2">
				<Link href="/">
					<IconButton color={activeColor('/')} variant="text">
						<HomeIcon className="w-5 h-5" />
					</IconButton>
				</Link>
				<Link href="/basket">
					<Badge
						color={Object.keys(items).length ? 'red' : 'white'}
						content={Object.keys(items).length || undefined}
						overlap="circular"
						placement="top-end"
					>
						<IconButton color={activeColor('/basket')} variant="text">
							<ShoppingCartIcon className="w-5 h-5" />
						</IconButton>
					</Badge>
				</Link>
				<Link href="/products">
					<IconButton color={activeColor('/products')} variant="text">
						<BuildingStorefrontIcon className="w-5 h-5" />
					</IconButton>
				</Link>
				<HamburgerMenu />
			</div>
		</Navbar>
	);
}
