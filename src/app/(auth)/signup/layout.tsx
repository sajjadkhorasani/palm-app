import Link from 'next/link';

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col justify-center items-center gap-8">
			{children}
			<div className="flex self-stretch flex-col justify-center items-center gap-2">
				<span className="text-sm ">{'I Have Account And I Want To Loged In'}</span>
				<Link href="/signin" className="text-sm border border-slate-500 rounded-md px-6 py-2">
					Sign In
				</Link>
			</div>
		</div>
	);
}
