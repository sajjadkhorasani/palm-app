'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { PowerIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Button, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';

import { Avatar } from '@@components';
import { signOut, useSession } from 'next-auth/react';

export function HamburgerMenu() {
	const router = useRouter();
	const { data } = useSession();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const onProfile = (e: React.MouseEvent) => {
		e.preventDefault();
		router.push('/profile');
	};

	const onSignOut = async (e: React.MouseEvent) => {
		e.preventDefault();
		signOut();
		router.push('/signin');
	};

	return (
		<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
			<MenuHandler>
				<Button
					variant="text"
					color="blue-gray"
					className="flex items-center gap-1 rounded-full py-0.5 px-2 lg:ml-auto"
				>
					<Typography className="me-2 normal-case " variant="small">
						{data?.user?.name?.replace('-', ' ')}
					</Typography>

					<Avatar
						className="border border-blue-500 p-0.5"
						variant="circular"
						size="sm"
						alt="candice wu"
						src={data?.user?.image}
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
}
