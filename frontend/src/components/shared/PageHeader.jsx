const PageHeader = ({ eyebrow, title, description, actions }) => (
	<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
		<div className="max-w-3xl space-y-2">
			{eyebrow ? (
				<p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
					{eyebrow}
				</p>
			) : null}
			<h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
				{title}
			</h1>
			{description ? (
				<p className="max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
					{description}
				</p>
			) : null}
		</div>
		{actions ? (
			<div className="flex flex-wrap items-center gap-3">{actions}</div>
		) : null}
	</div>
);

export default PageHeader;
