'use client';

import { Typography as MUITypography, TypographyProps } from '@material-tailwind/react';

export const Typography = ({ ...props }: TypographyProps) => {
	return <MUITypography {...props} />;
};
