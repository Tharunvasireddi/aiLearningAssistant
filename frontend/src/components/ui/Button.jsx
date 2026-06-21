import { classNames } from "../../utils/classNames";

const variants = {
	primary: "bg-emerald-500 text-slate-950 hover:bg-emerald-400",
	secondary:
		"bg-white/8 text-slate-100 hover:bg-white/12 border border-white/10",
	ghost: "bg-transparent text-slate-200 hover:bg-white/8",
	danger: "bg-rose-500 text-white hover:bg-rose-400",
};

const sizes = {
	sm: "px-3 py-2 text-sm",
	md: "px-4 py-2.5 text-sm",
	lg: "px-5 py-3 text-base",
};

const Button = ({
	className,
	variant = "primary",
	size = "md",
	loading = false,
	children,
	...props
}) => (
	<button
		className={classNames(
			"safe-focus inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
			variants[variant],
			sizes[size],
			className,
		)}
		disabled={loading || props.disabled}
		{...props}
	>
		{loading ? (
			<span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
		) : null}
		{children}
	</button>
);

export default Button;
