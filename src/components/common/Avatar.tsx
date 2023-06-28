'use client';

import { Avatar as MUIAvatar, AvatarProps } from '@material-tailwind/react';

interface IAvatarProps extends AvatarProps {}

export const Avatar = ({ src, ...props }: IAvatarProps) => {
	return <MUIAvatar src={src || '/default-product.webp'} {...(props as any)} />;
};
