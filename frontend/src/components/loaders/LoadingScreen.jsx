const LoadingScreen = () => (
	<div className="grid min-h-screen place-items-center px-4">
		<div className="glass-card w-full max-w-md rounded-3xl p-8">
			<div className="mb-4 h-12 w-12 rounded-2xl bg-emerald-400/20" />
			<div className="space-y-3">
				<div className="h-4 w-1/2 animate-pulse rounded-full bg-white/10" />
				<div className="h-4 w-3/4 animate-pulse rounded-full bg-white/10" />
				<div className="h-4 w-full animate-pulse rounded-full bg-white/10" />
			</div>
		</div>
	</div>
);

export default LoadingScreen;
