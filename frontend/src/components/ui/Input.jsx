import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";

const Input = forwardRef(
	({ className, label, error, helperText, ...props }, ref) => (
		<label className="flex flex-col gap-2 text-sm text-slate-200">
			{label ? (
				<span className="font-medium text-slate-100">{label}</span>
			) : null}
			<input
				ref={ref}
				className={classNames(
					"safe-focus rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 placeholder:text-slate-500 transition focus:border-emerald-400",
					error ? "border-rose-400" : "",
					className,
				)}
				{...props}
			/>
			{error ? <span className="text-xs text-rose-300">{error}</span> : null}
			{!error && helperText ? (
				<span className="text-xs text-slate-400">{helperText}</span>
			) : null}
		</label>
	),
);

Input.displayName = "Input";

export default Input;
