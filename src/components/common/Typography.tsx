/* eslint-disable react/display-name */
'use client';

import { Typography as MUITypography, TypographyProps } from '@material-tailwind/react';
import { forwardRef } from 'react';

export const Typography = forwardRef<TypographyProps['ref'], Omit<TypographyProps, 'ref'>>(({ ...props }, ref) => {
	return <MUITypography ref={ref as any} {...props} />;
});
