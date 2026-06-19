import Button from "../ui/Button";

const ErrorState = ({
	title = "Something went wrong",
	description,
	onRetry,
}) => (
	<div className="glass-card flex flex-col items-start gap-4 rounded-3xl p-8">
		<div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-500/15 text-rose-300">
			!
		</div>
		<div>
			<h3 className="text-xl font-semibold text-white">{title}</h3>
			<p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
				{description || "Please try again in a moment."}
			</p>
		</div>
		{onRetry ? <Button onClick={onRetry}>Retry</Button> : null}
	</div>
);

export default ErrorState;
