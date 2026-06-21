import Button from "../ui/Button";

const EmptyState = ({ title, description, actionLabel, onAction }) => (
	<div className="glass-card flex flex-col items-start gap-4 rounded-3xl p-8">
		<div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/8 text-emerald-300">
			∅
		</div>
		<div>
			<h3 className="text-xl font-semibold text-white">{title}</h3>
			<p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
				{description}
			</p>
		</div>
		{actionLabel ? <Button onClick={onAction}>{actionLabel}</Button> : null}
	</div>
);

export default EmptyState;
