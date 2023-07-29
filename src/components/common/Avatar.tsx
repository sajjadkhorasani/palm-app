'use client';

import { Avatar as MUIAvatar, AvatarProps } from '@material-tailwind/react';

interface IAvatarProps extends Omit<AvatarProps, 'src'> {
	src?: string | null;
}

export const Avatar = ({ src, ...props }: IAvatarProps) => {
	return <MUIAvatar src={src || '/default.png'} {...(props as any)} />;
};
