'use client';

import { Spinner } from "@material-tailwind/react";

export default function DashboardLoading() {
	return (
		<div>
			<h2>
				Dashboard Loading
				<Spinner className="h-10 w-10" />
			</h2>
		</div>
	);
}
