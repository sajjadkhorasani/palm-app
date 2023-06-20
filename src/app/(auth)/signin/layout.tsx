import Link from 'next/link';

export default function SignInLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col justify-center items-center gap-8">
			{children}
			<div className="flex self-stretch flex-col justify-center items-center gap-2">
				<span className="text-sm ">{"If You Don't Have Account. Go To the"}</span>
				<Link href="/signup" className="text-sm border border-slate-500 rounded-md px-6 py-2">
					Sign Up
				</Link>
			</div>
		</div>
	);
}
