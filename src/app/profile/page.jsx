"use client";

import ErrorComponent from "@/components/ErrorComponent";
import LoadingSpinner from "@/components/LoadingSpinner";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { auth } from "../firebase";
import ConfirmationEmail from "@/components/Auth/ConfirmationEmail";
import { useEffect } from "react";
import useAddUserToFirestore from "@/helpers/useAddUserToFirestore";
import useFirebaseAut from "@/helpers/useFirebaseAut";

const User = () => {
	const { data: session, status } = useSession({
		required: true,
		onUnauthenticated() {
			redirect("/auth/signin");
		},
	});

	useAddUserToFirestore();

	const checkIfEmailVerifiedCredentials = () => {
		if (status === "authenticated" && !auth?.currentUser) return true;
		if (status === "authenticated" && !auth.currentUser.emailVerified) return false;
		return true;
	};

	const isEmailVerifiedCredentials = checkIfEmailVerifiedCredentials();

	const userName = session ? session.user.name || session.user.email : "";

	const handleSignOut = () => {
		signOut({ callbackUrl: "/" });
	};

	const handleResetPassword = () => {
		// Implement your password reset logic here
	};

	const isCredentialsUser = false;

	if (status === "loading") return <LoadingSpinner />;

	if (isEmailVerifiedCredentials === false) return <ConfirmationEmail email={userName} />;

	if (status === "unauthenticated") return <ErrorComponent />;

	console.log("🚀 ~ User ~ session:", session);

	return (
		<>
			<div className="w-full min-h-screen flex flex-col items-center gap-8 p-6 md:p-12 text-white">
				<div className="w-full max-w-4xl text-center">
					<h1 className="text-2xl md:text-4xl font-semibold">Herzlich Willkommen, {userName}!</h1>
					<p className="text-lg md:text-xl mt-4">Hier kannst du deine gespeicherten Events und gekauften Tickets ansehen.</p>
				</div>

				<div className="w-full max-w-4xl flex flex-col gap-6">
					{isCredentialsUser && (
						<button className="clubbery_main_button hover_button_animation w-full py-3 text-lg md:text-xl" onClick={handleResetPassword}>
							Passwort zurücksetzen
						</button>
					)}

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
