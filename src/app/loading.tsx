'use client';

import { Spinner } from 'flowbite-react';

export default function RootLoading() {
	return (
		<div>
			<h2>
				Main Loading
				<Spinner className="w-10 h-10" />
			</h2>
		</div>
	);
}
