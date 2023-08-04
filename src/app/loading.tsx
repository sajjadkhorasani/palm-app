'use client';

import { LoadingAnimate } from '@@assets/icons';

export default function RootLoading() {
	return (
		<div className="flex justify-center items-center grow gap-4">
			<LoadingAnimate />
			<h1 className="">Please Wait</h1>
		</div>
	);
}
