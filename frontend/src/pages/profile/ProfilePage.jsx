import { useEffect, useState } from "react";
import PageSkeleton from "../../components/loaders/PageSkeleton";
import PageHeader from "../../components/shared/PageHeader";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { useProfileQuery, useUpdateProfileMutation } from "../../hooks/useAuth";
import { useAuthStore } from "../../store/useAuthStore";
import { useUIStore } from "../../store/useUIStore";

const ProfilePage = () => {
	const storedUser = useAuthStore((state) => state.user);
	const theme = useUIStore((state) => state.theme);
	const toggleTheme = useUIStore((state) => state.toggleTheme);
	const { data: profile, isLoading } = useProfileQuery();
	const updateProfileMutation = useUpdateProfileMutation();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		profileImage: "",
	});

	useEffect(() => {
		if (profile) {
			setFormData({
				username: profile.username || "",
				email: profile.email || "",
				profileImage: profile.profileImage || "",
			});
		}
	}, [profile]);

	if (isLoading) return <PageSkeleton rows={3} />;

	return (
		<div className="space-y-6">
			<PageHeader
				eyebrow="Profile"
				title="Account settings"
				description="Manage your personal details and workspace preferences."
			/>

			<div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
				<Card>
					<div className="space-y-3">
						<p className="text-sm text-slate-400">Authenticated user</p>
						<h2 className="text-2xl font-bold text-white">
							{profile?.username || storedUser?.email || "Guest"}
						</h2>
						<p className="text-sm text-slate-400">
							{profile?.email || storedUser?.email || "No email available"}
						</p>
					</div>
					<div className="mt-6 space-y-3">
						<Button variant="secondary" onClick={toggleTheme}>
							Theme: {theme}
						</Button>
					</div>
				</Card>

				<Card>
					<form
						className="grid gap-4"
						onSubmit={(event) => {
							event.preventDefault();
							updateProfileMutation.mutate(formData);
						}}
					>
						<Input
							label="Username"
							value={formData.username}
							onChange={(event) =>
								setFormData((state) => ({
									...state,
									username: event.target.value,
								}))
							}
						/>
						<Input
							label="Email"
							type="email"
							value={formData.email}
							onChange={(event) =>
								setFormData((state) => ({
									...state,
									email: event.target.value,
								}))
							}
						/>
						<Input
							label="Profile image URL"
							value={formData.profileImage}
							onChange={(event) =>
								setFormData((state) => ({
									...state,
									profileImage: event.target.value,
								}))
							}
						/>
						<Button type="submit" loading={updateProfileMutation.isPending}>
							Save profile
						</Button>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default ProfilePage;
