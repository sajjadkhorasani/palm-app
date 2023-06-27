'use client';

import React from 'react';
import {
	Navbar,
	Collapse,
	Typography,
	Button,
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Avatar,
	IconButton,
} from '@material-tailwind/react';
import {
	CubeTransparentIcon,
	UserCircleIcon,
	CodeBracketSquareIcon,
	ChevronDownIcon,
	Cog6ToothIcon,
	InboxArrowDownIcon,
	LifebuoyIcon,
	PowerIcon,
	Bars2Icon,
	CircleStackIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

const profileMenuItems = [
	{
		label: 'My Profile',
		icon: UserCircleIcon,
	},
	{
		label: 'Edit Profile',
		icon: Cog6ToothIcon,
	},
	{
		label: 'Inbox',
		icon: InboxArrowDownIcon,
	},
	{
		label: 'Help',
		icon: LifebuoyIcon,
	},
	{
		label: 'Sign Out',
		icon: PowerIcon,
	},
];

function ProfileMenu() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const closeMenu = () => setIsMenuOpen(false);

	return (
		<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
			<MenuHandler>
				<Button
					variant="text"
					color="blue-gray"
					className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
				>
					<Avatar
						variant="circular"
						size="sm"
						alt="candice wu"
						className="border border-blue-500 p-0.5"
						src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
					/>
					<ChevronDownIcon
						strokeWidth={2.5}
						className={`h-3 w-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
					/>
				</Button>
			</MenuHandler>
			<MenuList className="p-1">
				{profileMenuItems.map(({ label, icon }, key) => {
					const isLastItem = key === profileMenuItems.length - 1;
					return (
						<MenuItem
							key={label}
							onClick={closeMenu}
							className={`flex items-center gap-2 rounded ${
								isLastItem ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10' : ''
							}`}
						>
							{React.createElement(icon, {
								className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
								strokeWidth: 2,
							})}
							<Typography
								as="span"
								variant="small"
								className="font-normal"
								color={isLastItem ? 'red' : 'inherit'}
							>
								{label}
							</Typography>
						</MenuItem>
					);
				})}
			</MenuList>
		</Menu>
	);
}

// nav list component
const navListItems = [
	{
		label: 'Products',
		icon: CircleStackIcon,
		href: '/home',
	},
	{
		label: 'Blocks',
		icon: CubeTransparentIcon,
		href: '/profile',
	},
	{
		label: 'Docs',
		icon: CodeBracketSquareIcon,
		href: '/shop',
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
							{React.createElement(icon, {
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
	const [isNavOpen, setIsNavOpen] = React.useState(false);
	const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

	React.useEffect(() => {
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
				<ProfileMenu />
			</div>
			<Collapse open={isNavOpen} className="overflow-scroll">
				<NavList />
			</Collapse>
		</Navbar>
	);
}
