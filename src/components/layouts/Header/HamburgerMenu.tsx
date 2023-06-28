'use client';

import clsx from 'clsx';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { PowerIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Avatar, Button, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';

import { signout } from './actions';

export const HamburgerMenu = () => {
	const router = useRouter();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isPending, startTransition] = useTransition();

	const onProfile = (e: React.MouseEvent) => {
		e.preventDefault();
		router.push('/profile');
	};

	const onSignOut = async (e: React.MouseEvent) => {
		e.preventDefault();
		startTransition(() => signout());
		router.push('/');
	};

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
						className={clsx('h-3 w-3 transition-transform', {
							'rotate-180': isMenuOpen,
						})}
					/>
				</Button>
			</MenuHandler>

			<MenuList className="p-1">
				<MenuItem className="flex items-center gap-2 rounded" onClick={onProfile}>
					<UserCircleIcon className="h-4 w-4 stroke-2" />
					<Typography as="span" variant="small" className="font-normal">
						My Profile
					</Typography>
				</MenuItem>
				<MenuItem className="flex items-center gap-2 rounded" onClick={onSignOut}>
					<PowerIcon className="h-4 w-4 stroke-2 stroke-red-400" />
					<Typography as="span" variant="small" className="font-normal text-red-400">
						Sign Out
					</Typography>
				</MenuItem>
			</MenuList>
		</Menu>
	);
};
