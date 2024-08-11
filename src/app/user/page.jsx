"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const User = () => {
	const session = useSession({
		// required: true,
		// onUnauthenticated() {
		// 	redirect("/signin");
		// },
	});

	const userName = session?.data ? session.data.user.name || session.data.user.email : "";

	const logOut = () => {
		signOut({ callbackUrl: "/" });
	};

	console.log("🚀 ~ User ~ session:", session);

	return (
		<>
			<div className="w-full h-screen flex flex-col justify-center items-center gap-5">
				<p className="text-white text-3xl font-semibold">Herzlich wilkommen, {userName}</p>
				<p className="text-white text-lg">Hier findest du deine Lieblignsevents!</p>
				<button className="clubbery_main_button hover_button_animation" onClick={logOut}>
					Abmelden
				</button>
			</div>
		</>
	);
};

User.requireAuth = true;

export default User;
