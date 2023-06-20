'use client';

import clsx from 'clsx';
import NextLink, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

interface ILinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
	activeClass?: string;
}

export const Link = ({ className, activeClass, children, ...props }: ILinkProps) => {
	const pathname = usePathname();
	return (
		<NextLink className={clsx(className, { [`${activeClass}`]: props.href === pathname })} {...props}>
			{children}
		</NextLink>
	);
};
