import Card from "../ui/Card";

const AuthForm = ({ title, subtitle, children, footer }) => (
	<Card className="mx-auto w-full max-w-md p-8">
		<div className="mb-6 space-y-2">
			<p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
				AI Learning Assistant
			</p>
			<h1 className="text-3xl font-black text-white">{title}</h1>
			{subtitle ? (
				<p className="text-sm leading-6 text-slate-400">{subtitle}</p>
			) : null}
		</div>
		{children}
		{footer ? (
			<div className="mt-6 text-sm text-slate-400">{footer}</div>
		) : null}
	</Card>
);

export default AuthForm;
