import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	Brain,
	ChartColumnBig,
	FileText,
	Sparkles,
	Target,
	Zap,
} from "lucide-react";
import BrandMark from "../components/shared/BrandMark";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { routes } from "../constants/routes";
import { useAuthStore } from "../store/useAuthStore";

const highlights = [
	{
		title: "AI summaries",
		description: "Turn PDFs into concise study notes with one click.",
		icon: FileText,
	},
	{
		title: "Flashcard generation",
		description: "Generate revision-ready cards from any document.",
		icon: Brain,
	},
	{
		title: "Adaptive quizzes",
		description: "Test recall and track progress with structured assessments.",
		icon: Target,
	},
];

const metrics = [
	{ value: "5x", label: "faster review cycles" },
	{ value: "24/7", label: "document access" },
	{ value: "1", label: "workspace for everything" },
];

const LandingPage = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	return (
		<div className="min-h-screen">
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute inset-0 grid-bg opacity-30" />
				<div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-emerald-400/18 blur-3xl" />
				<div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
			</div>

			<header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
				<BrandMark />
				<div className="flex items-center gap-3">
					<Link to={routes.login}>
						<Button variant="ghost" size="sm">
							Sign in
						</Button>
					</Link>
					<Link to={routes.register}>
						<Button size="sm">Get started</Button>
					</Link>
				</div>
			</header>

			<main className="mx-auto flex max-w-7xl flex-col gap-16 px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-14">
				<section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
					<div className="max-w-3xl space-y-8">
						<div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
							<Sparkles size={16} />
							AI-powered learning workspace
						</div>

						<div className="space-y-5">
							<h1 className="max-w-3xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
								Turn documents into a
								<span className="bg-linear-to-r from-emerald-300 via-cyan-300 to-sky-300 bg-clip-text text-transparent">
									study system
								</span>
								.
							</h1>
							<p className="max-w-2xl text-lg leading-8 text-slate-300">
								Upload PDFs, generate summaries, flashcards, and quizzes, then
								revisit everything in one fast, focused workspace built for deep
								study sessions.
							</p>
						</div>

						<div className="flex flex-col gap-3 sm:flex-row">
							<Link to={isAuthenticated ? routes.dashboard : routes.register}>
								<Button size="lg" className="w-full sm:w-auto">
									{isAuthenticated ? "Open dashboard" : "Start free"}
									<ArrowRight size={16} />
								</Button>
							</Link>
							<Link to={routes.login}>
								<Button
									variant="secondary"
									size="lg"
									className="w-full sm:w-auto"
								>
									Sign in
								</Button>
							</Link>
						</div>

						<div className="grid gap-4 pt-4 sm:grid-cols-3">
							{metrics.map((metric) => (
								<Card key={metric.label} className="p-5">
									<p className="text-3xl font-black text-white">
										{metric.value}
									</p>
									<p className="mt-2 text-sm text-slate-400">{metric.label}</p>
								</Card>
							))}
						</div>
					</div>

					<div className="relative">
						<div className="absolute -inset-6 rounded-4xl bg-linear-to-br from-emerald-400/10 to-cyan-400/10 blur-2xl" />
						<Card className="relative overflow-hidden p-6 sm:p-8">
							<div className="flex items-start justify-between gap-4">
								<div>
									<p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
										Study cockpit
									</p>
									<h2 className="mt-3 text-2xl font-bold text-white">
										Everything you need, one click away.
									</h2>
								</div>
								<div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300">
									<Zap size={18} />
								</div>
							</div>

							<div className="mt-8 grid gap-4 sm:grid-cols-2">
								<div className="rounded-3xl border border-white/10 bg-white/5 p-5">
									<p className="text-sm text-slate-400">Upload</p>
									<p className="mt-3 text-lg font-semibold text-white">
										PDF documents
									</p>
									<p className="mt-2 text-sm text-slate-300">
										Store and index files for AI workflows.
									</p>
								</div>
								<div className="rounded-3xl border border-white/10 bg-white/5 p-5">
									<p className="text-sm text-slate-400">Generate</p>
									<p className="mt-3 text-lg font-semibold text-white">
										Cards & quizzes
									</p>
									<p className="mt-2 text-sm text-slate-300">
										Study assets built from your content.
									</p>
								</div>
							</div>

							<div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/55 p-5">
								<div className="flex items-center gap-3 text-sm text-slate-300">
									<ChartColumnBig size={16} className="text-emerald-300" />
									Performance-first architecture
								</div>
								<div className="mt-4 grid gap-3 sm:grid-cols-3">
									{[
										"Lazy-loaded routes",
										"Query caching",
										"Global UI state",
									].map((item) => (
										<div
											key={item}
											className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200"
										>
											{item}
										</div>
									))}
								</div>
							</div>
						</Card>
					</div>
				</section>

				<section className="grid gap-4 md:grid-cols-3">
					{highlights.map((item, index) => {
						const Icon = item.icon;
						return (
							<Card
								key={item.title}
								className="p-6 opacity-0 animate-[fadeIn_0.5s_ease_forwards]"
								style={{ animationDelay: `${index * 120}ms` }}
							>
								<div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300">
									<Icon size={18} />
								</div>
								<h3 className="mt-5 text-xl font-bold text-white">
									{item.title}
								</h3>
								<p className="mt-3 text-sm leading-6 text-slate-400">
									{item.description}
								</p>
							</Card>
						);
					})}
				</section>

				<section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
					<Card className="p-6 sm:p-8">
						<p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
							Workflow
						</p>
						<h2 className="mt-3 text-3xl font-black text-white">
							From upload to revision in three steps.
						</h2>
						<div className="mt-6 space-y-4 text-sm leading-6 text-slate-300">
							<p>
								1. Upload a document and let the backend extract and chunk text.
							</p>
							<p>
								2. Generate summaries, flashcards, and quizzes with AI-powered
								endpoints.
							</p>
							<p>
								3. Review progress from one dashboard with persistent workspace
								state.
							</p>
						</div>
					</Card>

					<Card className="p-6 sm:p-8">
						<p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
							Why it scales
						</p>
						<div className="mt-5 grid gap-4 sm:grid-cols-2">
							{[
								"TanStack Router for route composition",
								"TanStack Query for server-state caching",
								"Zustand for lightweight global state",
								"Reusable UI and skeleton components",
							].map((item) => (
								<div
									key={item}
									className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300"
								>
									{item}
								</div>
							))}
						</div>
					</Card>
				</section>
			</main>
		</div>
	);
};

export default LandingPage;
