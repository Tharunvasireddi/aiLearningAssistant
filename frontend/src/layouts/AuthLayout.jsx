import BrandMark from "../components/shared/BrandMark";

const AuthLayout = ({ children }) => (
	<div className="grid min-h-screen lg:grid-cols-[1.15fr_0.85fr]">
		<div className="relative hidden overflow-hidden border-r border-white/10 bg-slate-950/70 p-10 lg:flex lg:flex-col lg:justify-between">
			<div className="absolute inset-0 grid-bg opacity-40" />
			<div className="relative z-10 flex items-center justify-between">
				<BrandMark />
				<span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
					Production-ready React
				</span>
			</div>
			<div className="relative z-10 max-w-xl space-y-6">
				<h2 className="text-5xl font-black tracking-tight text-white">
					Study faster with document-aware AI workflows.
				</h2>
				<p className="max-w-lg text-base leading-7 text-slate-300">
					Upload PDFs, generate flashcards, take adaptive quizzes, and chat with
					your documents from one polished workspace.
				</p>
				<div className="grid grid-cols-3 gap-4 text-sm text-slate-300">
					<div className="glass-card rounded-2xl p-4">
						Router-driven layouts
					</div>
					<div className="glass-card rounded-2xl p-4">Query caching</div>
					<div className="glass-card rounded-2xl p-4">Zustand state</div>
				</div>
			</div>
			<div className="relative z-10 text-sm text-slate-500">
				Built for scalability, performance, and clean team ownership.
			</div>
		</div>
		<div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
			{children}
		</div>
	</div>
);

export default AuthLayout;
