const ListSkeleton = ({ items = 6 }) => (
	<div className="grid gap-4">
		{Array.from({ length: items }).map((_, index) => (
			<div key={index} className="glass-card rounded-3xl p-5">
				<div className="h-4 w-32 animate-pulse rounded-full bg-white/10" />
				<div className="mt-3 h-4 w-4/5 animate-pulse rounded-full bg-white/10" />
				<div className="mt-2 h-4 w-2/3 animate-pulse rounded-full bg-white/10" />
			</div>
		))}
	</div>
);

export default ListSkeleton;
