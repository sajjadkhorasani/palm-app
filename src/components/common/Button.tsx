'use client';

import clsx from 'clsx';
import { Button as MaterialButton, ButtonProps as MaterialButtonProps, Spinner } from '@material-tailwind/react';

interface ButtonProps extends Omit<MaterialButtonProps, 'ref'> {
	ref?: React.RefObject<HTMLButtonElement>;
	loading?: boolean;
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
