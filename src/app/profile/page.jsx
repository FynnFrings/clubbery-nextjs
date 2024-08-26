"use client";

import useAuth from "../hooks/useAuth";
import { userSignOut } from "../libs/getAuth";
import { useRouter } from "next/navigation";
import loadable from "@loadable/component";

const User = () => {
	const router = useRouter();
	const { user, status } = useAuth();

	const displayUserName = user?.displayName ?? user?.email;

	const handleSignOut = async () => {
		try {
			await userSignOut();
			router.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	const LoadingSpinner = loadable(() => import("@/components/LoadingSpinner"));
	const ConfirmationEmail = loadable(() => import("@/components/Auth/ConfirmationEmail"));
	const ErrorComponent = loadable(() => import("@/components/ErrorComponent"));

	if (status === "loading") return <LoadingSpinner />;
	if (status === "authenthicated" && user && !user.emailVerified) return <ConfirmationEmail />;
	if (status === "unauthenthicated") return <ErrorComponent />;

	return (
		<>
			<div className="w-full min-h-screen flex flex-col items-center gap-8 p-6 md:p-12 text-white">
				<div className="w-full max-w-4xl text-center">
					<h1 className="text-2xl md:text-4xl font-semibold">Herzlich Willkommen, {displayUserName}!</h1>
					<p className="text-lg md:text-xl mt-4">Hier kannst du deine gespeicherten Events und gekauften Tickets ansehen.</p>
				</div>

				<div className="w-full max-w-4xl flex flex-col gap-6">
					{/* {isCredentialsUser && (
						<button className="clubbery_main_button hover_button_animation w-full py-3 text-lg md:text-xl" onClick={handleResetPassword}>
							Passwort zurücksetzen
						</button>
					)} */}

					<div className="w-full max-w-4xl flex flex-col gap-8 mt-8">
						{/* Favorite Events Section */}
						<div>
							<h2 className="text-2xl md:text-3xl font-semibold mb-4">Gespeicherte Events</h2>
							<div className="bg-white bg-opacity-10 p-4 rounded-lg">
								{/* Replace with dynamic content */}
								<p className="text-lg">Du hast noch keine Events gespeichert.</p>
							</div>
						</div>

						{/* Purchased Tickets Section */}
						<div>
							<h2 className="text-2xl md:text-3xl font-semibold mb-4">Gekaufte Tickets</h2>
							<div className="bg-white bg-opacity-10 p-4 rounded-lg">
								{/* Replace with dynamic content */}
								<p className="text-lg">Du hast noch keine Tickets gekauft.</p>
							</div>
						</div>
					</div>

					<button className="clubbery_main_button hover_button_animation w-full py-3 text-lg md:text-xl" onClick={handleSignOut}>
						Abmelden
					</button>
				</div>
			</div>
		</>
	);
};

User.requireAuth = true;

export default User;
