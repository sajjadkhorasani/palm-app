'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createElement, useEffect, useState } from 'react';
import { Bars2Icon, CircleStackIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Navbar, Collapse, Typography, MenuItem, IconButton } from '@material-tailwind/react';

import { HamburgerMenu } from './HamburgerMenu';

const navListItems = [
	{
		label: 'Products',
		icon: CircleStackIcon,
		href: '/home',
	},
	{
		label: 'Profile',
		icon: UserCircleIcon,
		href: '/profile',
	},
];

function NavList() {
	const pathname = usePathname();

	const isActive = (route: string) => pathname === route;

	return (
		<ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
			{navListItems.map(({ label, icon, href }, key) => (
				<Link key={key} href={href}>
					<Typography className={clsx('font-normal', { 'text-blue-500': isActive(href) })} variant="small">
						<MenuItem className="flex items-center gap-2 lg:rounded-full">
							{createElement(icon, {
								className: clsx('h-[18px] w-[18px]', { 'text-blue-500': isActive(href) }),
							})}{' '}
							{label}
						</MenuItem>
					</Typography>
				</Link>
			))}
		</ul>
	);
}

export function MainHeader() {
	const [isNavOpen, setIsNavOpen] = useState(false);
	const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

	useEffect(() => {
		window.addEventListener('resize', () => window.innerWidth >= 960 && setIsNavOpen(false));
	}, []);

	return (
		<Navbar className="mx-auto sticky top-2 p-2 my-4 z-10 lg:rounded-full lg:pl-6">
			<div className="relative mx-auto flex items-center text-blue-gray-900">
				<Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-medium">Palm App</Typography>
				<div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
					<NavList />
				</div>
				<IconButton
					size="sm"
					color="blue-gray"
					variant="text"
					onClick={toggleIsNavOpen}
					className="ml-auto mr-2 lg:hidden"
				>
					<Bars2Icon className="h-6 w-6" />
				</IconButton>
				<HamburgerMenu />
			</div>
			<Collapse open={isNavOpen} className="overflow-scroll">
				<NavList />
			</Collapse>
		</Navbar>
	);
}
