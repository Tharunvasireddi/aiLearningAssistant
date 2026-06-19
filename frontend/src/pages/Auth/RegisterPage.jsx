import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import AuthForm from "../../components/forms/AuthForm";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useRegisterMutation } from "../../hooks/useAuth";
import AuthLayout from "../../layouts/AuthLayout";

const RegisterPage = () => {
	const router = useRouter();
	const registerMutation = useRegisterMutation();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		registerMutation.mutate(formData, {
			onSuccess: () => router.navigate({ to: "/login" }),
		});
	};

	return (
		<AuthLayout>
			<AuthForm
				title="Create your account"
				subtitle="Set up your workspace in under a minute."
				footer={
					<>
						Already have an account?{" "}
						<Link to="/login" className="font-semibold text-emerald-300">
							Sign in
						</Link>
					</>
				}
			>
				<form className="space-y-4" onSubmit={handleSubmit}>
					<Input
						label="Username"
						value={formData.username}
						onChange={(event) =>
							setFormData((state) => ({
								...state,
								username: event.target.value,
							}))
						}
						placeholder="jane_doe"
					/>
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
						placeholder="At least 6 characters"
					/>
					<Button
						type="submit"
						className="w-full"
						loading={registerMutation.isPending}
					>
						Create account
					</Button>
				</form>
			</AuthForm>
		</AuthLayout>
	);
};

export default RegisterPage;
