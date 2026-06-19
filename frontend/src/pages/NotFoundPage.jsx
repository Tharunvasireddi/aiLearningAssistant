import { Link } from "@tanstack/react-router";
import Button from "../components/ui/Button";

const NotFoundPage = () => (
	<div className="grid min-h-screen place-items-center px-4">
		<div className="glass-card w-full max-w-xl rounded-4xl p-10 text-center">
			<p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
				404
			</p>
			<h1 className="mt-4 text-4xl font-black text-white">Page not found</h1>
			<p className="mt-4 text-sm leading-6 text-slate-400">
				The page you requested does not exist or was moved.
			</p>
			<div className="mt-8 flex justify-center">
				<Link to="/dashboard">
					<Button>Go to dashboard</Button>
				</Link>
			</div>
		</div>
	</div>
);

export default NotFoundPage;
