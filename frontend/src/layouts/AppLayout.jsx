import { Link, Outlet, useRouter } from "@tanstack/react-router";
import {
	Bell,
	BookOpenText,
	LayoutDashboard,
	LogOut,
	Menu,
	MoonStar,
	Search,
	Settings2,
	SunMedium,
	UserCircle2,
} from "lucide-react";
import BrandMark from "../components/shared/BrandMark";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuthStore } from "../store/useAuthStore";
import { useUIStore } from "../store/useUIStore";
import { useWishlistStore } from "../store/useWishlistStore";
import { classNames } from "../utils/classNames";

const navItems = [
	{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
	{ to: "/documents", label: "Documents", icon: BookOpenText },
	{ to: "/profile", label: "Profile", icon: UserCircle2 },
];

const AppLayout = () => {
	const router = useRouter();
	const logout = useAuthStore((state) => state.logout);
	const theme = useUIStore((state) => state.theme);
	const toggleTheme = useUIStore((state) => state.toggleTheme);
	const sidebarOpen = useUIStore((state) => state.sidebarOpen);
	const toggleSidebar = useUIStore((state) => state.toggleSidebar);
	const wishlistCount = useWishlistStore((state) => state.items.length);

	return (
		<div className="min-h-screen px-3 py-3 sm:px-4 sm:py-4 lg:px-6">
			<div className="grid min-h-[calc(100vh-1.5rem)] grid-cols-1 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/55 shadow-[0_24px_100px_rgba(0,0,0,0.45)] lg:grid-cols-[280px_1fr]">
				<aside
					className={classNames(
						"border-b border-white/10 bg-slate-950/70 p-5 lg:border-b-0 lg:border-r",
						sidebarOpen ? "block" : "hidden lg:block",
					)}
				>
					<div className="flex items-center justify-between">
						<BrandMark />
						<Button
							variant="ghost"
							size="sm"
							className="lg:hidden"
							onClick={toggleSidebar}
						>
							<Menu size={16} />
						</Button>
					</div>

					<div className="mt-8 space-y-2">
						{navItems.map((item) => {
							const Icon = item.icon;
							return (
								<Link
									key={item.to}
									to={item.to}
									activeProps={{
										className:
											"bg-emerald-400/15 text-emerald-200 border-emerald-400/25",
									}}
									className="flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-white/10 hover:bg-white/5"
								>
									<Icon size={16} />
									{item.label}
								</Link>
							);
						})}
					</div>

					<div className="mt-8 glass-card rounded-3xl p-4">
						<p className="text-xs uppercase tracking-[0.3em] text-slate-400">
							Quick Stats
						</p>
						<div className="mt-4 space-y-3 text-sm text-slate-300">
							<div className="flex items-center justify-between">
								<span>Theme</span>
								<span className="font-semibold text-white">{theme}</span>
							</div>
							<div className="flex items-center justify-between">
								<span>Wishlist</span>
								<span className="font-semibold text-white">
									{wishlistCount}
								</span>
							</div>
						</div>
					</div>
				</aside>

				<div className="flex min-h-0 flex-col">
					<header className="flex items-center justify-between gap-4 border-b border-white/10 bg-slate-950/60 px-4 py-4 sm:px-6">
						<div className="flex items-center gap-3">
							<Button
								variant="ghost"
								size="sm"
								className="lg:hidden"
								onClick={toggleSidebar}
							>
								<Menu size={16} />
							</Button>
							<div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 md:flex">
								<Search size={16} className="text-slate-400" />
								<Input
									className="border-0 bg-transparent px-0 py-0 text-sm shadow-none focus:border-0"
									placeholder="Search your workspace"
								/>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<Button variant="ghost" size="sm" onClick={toggleTheme}>
								{theme === "dark" ? (
									<SunMedium size={16} />
								) : (
									<MoonStar size={16} />
								)}
							</Button>
							<Button variant="ghost" size="sm">
								<Bell size={16} />
							</Button>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => router.navigate({ to: "/profile" })}
							>
								<Settings2 size={16} />
							</Button>
							<Button variant="secondary" size="sm" onClick={logout}>
								<LogOut size={16} />
								Sign out
							</Button>
						</div>
					</header>

					<main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
						<div className="mx-auto flex max-w-7xl flex-col gap-6">
							<Outlet />
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default AppLayout;
