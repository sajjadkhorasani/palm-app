export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return <div className="container mx-auto w-full h-full flex flex-col justify-center items-center">{children}</div>;
}
