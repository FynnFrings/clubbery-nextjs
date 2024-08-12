"use client";

import ErrorComponent from "@/components/ErrorComponent";
import LoadingSpinner from "@/components/LoadingSpinner";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const User = () => {
	const { data: session, status } = useSession({
		required: true,
		onUnauthenticated() {
			redirect("/signin");
		},
	});

	const userName = session ? session.user.name || session.user.email : "";

	const logOut = () => {
		signOut({ callbackUrl: "/" });
	};

	if (status === "loading") return <LoadingSpinner />;

	if (status === "unauthenticated") return <ErrorComponent />;

	return (
		<>
			<div className="w-full h-screen flex flex-col justify-center items-center gap-5">
				<p className="text-white text-3xl font-semibold">Herzlich wilkommen, {userName}</p>
				<p className="text-white text-lg">Hier findest du deine Lieblingsevents!</p>
				<button className="clubbery_main_button hover_button_animation" onClick={logOut}>
					Abmelden
				</button>
			</div>
		</>
	);
};

User.requireAuth = true;

export default User;
