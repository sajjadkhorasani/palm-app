'use client';

import { Spinner } from '@material-tailwind/react';

export default function DashboardLoading() {
	return (
		<div className='flex flex-col justify-center items-center grow' >
			<Spinner className="h-10 w-10" />
		</div>
	);
}
