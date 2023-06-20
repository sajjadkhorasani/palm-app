'use client';

import { Spinner } from 'flowbite-react';

export default function DashboardLoading() {
	return (
		<div>
			<h2>
				Dashboard Loading
				<Spinner className="w-10 h-10" />
			</h2>
		</div>
	);
}
