"use client";

import convertFirebaseErrors from "@/helpers/convertFirebaseErrors";
import { auth } from "@/app/firebase";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";

const RecoverPassword = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handlePasswordReset = async (event) => {
		event.preventDefault();

		setLoading(true);
		setMessage("");
		setError("");

		try {
			await sendPasswordResetEmail(auth, email);
			setMessage("Eine E-Mail zum Zurücksetzen des Passworts wurde gesendet.");
		} catch (error) {
			const errorMessage = convertFirebaseErrors(error.code);
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<form onSubmit={handlePasswordReset} className="w-full h-screen flex flex-col justify-center items-center gap-5">
				<p className="text-white text-3xl font-semibold">Passwort zurücksetzen</p>
				<p className="text-white text-lg">Gib deine E-Mail-Adresse ein, um dein Passwort zurückzusetzen:</p>
				<div className="w-full md:w-1/2 lg:w-1/3">
					<input type="email" placeholder="E-Mail-Adresse" className="clubbery_input lg:py-4" value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				{message && <p className="text-green-400 text-lg">{message}</p>}
				{error && <p className="text-red-400 text-lg">{error}</p>}
				<button className="clubbery_main_button hover_button_animation" type="submit" disabled={loading}>
					{loading ? "Senden..." : "Passwort zurücksetzen"}
				</button>
			</form>
		</>
	);
};

export default RecoverPassword;
