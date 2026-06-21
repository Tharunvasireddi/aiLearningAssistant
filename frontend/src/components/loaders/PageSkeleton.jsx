const PageSkeleton = ({ rows = 4 }) => (
	<div className="space-y-4">
		<div className="h-8 w-48 animate-pulse rounded-full bg-white/10" />
		<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
			{Array.from({ length: rows }).map((_, index) => (
				<div key={index} className="glass-card rounded-3xl p-5">
					<div className="h-4 w-24 animate-pulse rounded-full bg-white/10" />
					<div className="mt-4 h-8 w-20 animate-pulse rounded-full bg-white/10" />
					<div className="mt-6 h-24 animate-pulse rounded-2xl bg-white/10" />
				</div>
			))}
		</div>
	</div>
);

export default PageSkeleton;
