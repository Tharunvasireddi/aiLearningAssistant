import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import AuthForm from "../../components/forms/AuthForm";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useLoginMutation } from "../../hooks/useAuth";
import AuthLayout from "../../layouts/AuthLayout";

const LoginPage = () => {
	const router = useRouter();
	const loginMutation = useLoginMutation();
	const [formData, setFormData] = useState({ email: "", password: "" });

	const handleSubmit = (event) => {
		event.preventDefault();
		loginMutation.mutate(formData, {
			onSuccess: () => router.navigate({ to: "/dashboard" }),
		});
	};

	return (
		<AuthLayout>
			<AuthForm
				title="Welcome back"
				subtitle="Sign in to continue where you left off."
				footer={
					<>
						New here?{" "}
						<Link to="/register" className="font-semibold text-emerald-300">
							Create an account
						</Link>
					</>
				}
			>
				<form className="space-y-4" onSubmit={handleSubmit}>
					<Input
						label="Email"
						type="email"
						value={formData.email}
						onChange={(event) =>
							setFormData((state) => ({ ...state, email: event.target.value }))
						}
						placeholder="you@example.com"
					/>
					<Input
						label="Password"
						type="password"
						value={formData.password}
						onChange={(event) =>
							setFormData((state) => ({
								...state,
								password: event.target.value,
							}))
						}
						placeholder="••••••••"
					/>
					<Button
						type="submit"
						className="w-full"
						loading={loginMutation.isPending}
					>
						Sign in
					</Button>
				</form>
			</AuthForm>
		</AuthLayout>
	);
};

export default LoginPage;
