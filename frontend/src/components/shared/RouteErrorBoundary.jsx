import ErrorState from "./ErrorState";

const RouteErrorBoundary = ({ error }) => {
	const description = error?.message || "The page could not be loaded.";

	return (
		<div className="min-h-screen p-6">
			<ErrorState title="Route error" description={description} />
			{import.meta.env.DEV && error?.stack ? (
				<pre className="mt-6 overflow-auto rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-xs leading-6 text-slate-300">
					{error.stack}
				</pre>
			) : null}
		</div>
	);
};

export default RouteErrorBoundary;
