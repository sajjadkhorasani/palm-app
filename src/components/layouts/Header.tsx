import { Link } from '@@components';

const activeClass = 'border-b-2 text-blue-500 border-b-blue-500';
export const MainHeader = () => {
	return (
		<nav className="static top-0 w-full border-b border-b-slate-50 bg-white shadow-lg">
			<div className="relative flex flex-row justify-start items-start gap-2 p-4">
				<Link className="relative flex grow-0 py-1 px-4" activeClass={activeClass} href="/home">
					Home
				</Link>
				<Link className="relative flex grow-0 py-1 px-4" activeClass={activeClass} href="/shop">
					Shop
				</Link>
				<Link className="relative flex grow-0 py-1 px-4" activeClass={activeClass} href="/profile">
					Profile
				</Link>
			</div>
		</nav>
	);
};
