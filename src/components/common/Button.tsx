'use client';

import clsx from 'clsx';
import { Button as MaterialButton, Spinner } from '@material-tailwind/react';

type MaterialButtonProps = React.ComponentProps<typeof MaterialButton>;
interface ButtonProps extends Omit<MaterialButtonProps, 'children'> {
	ref?: React.RefObject<HTMLButtonElement>;
	loading?: boolean;
	children?: React.ReactNode;
}

export const Button = ({ loading, children, ...props }: ButtonProps) => {
	const isLoading = loading ? Boolean(loading) : false;
	return (
		<MaterialButton
			className={clsx('flex justify-center items-center', props.className)}
			disabled={isLoading || props.disabled}
			{...props}
		>
			{isLoading ? <Spinner /> : children}
		</MaterialButton>
	);
};
