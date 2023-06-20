'use client';

import { SignInForm } from '@@components';

export default function SignInPage() {
	return (
		<div className="relative bg-white border shadow-md rounded-md backdrop-blur-lg px-8 py-10">
			<SignInForm />
		</div>
	);
}
