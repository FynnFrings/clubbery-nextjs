"use client ";

import React, { useState } from "react";

import { sendEmailVerification } from "firebase/auth";
import { auth } from "@/app/firebase";

const ConfirmationEmail = ({ email }) => {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const resendVerificationEmail = async () => {
		setLoading(true);
		setMessage("");
		try {
			const user = auth.currentUser;

			if (user) {
				await sendEmailVerification(user);
				setMessage("Eine neue Bestätigungs-E-Mail wurde gesendet.");
			} else {
				setMessage("Kein Benutzer ist eingeloggt.");
			}
		} catch (error) {
			setMessage("Fehler beim Senden der Bestätigungs-E-Mail. Bitte versuche es später erneut.");
			console.error("Error sending verification email:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full h-screen flex flex-col justify-center items-center gap-5 p-4 text-center">
			<p className="text-white text-2xl md:text-3xl font-semibold">Bestätige deine E-Mail-Adresse</p>
			<p className="text-white text-base md:text-lg">
				Bitte bestätige deine E-Mail-Adresse: <span className="font-semibold">{email}</span>
			</p>
			<p className="text-white text-base md:text-lg">Ein Bestätigungslink wurde an deine E-Mail gesendet.</p>

			{message && <p className="text-white text-base md:text-lg">{message}</p>}

			<button className="clubbery_main_button hover_button_animation px-4 py-2 md:px-6 md:py-3 text-sm md:text-base" onClick={resendVerificationEmail} disabled={loading}>
				{loading ? "Senden..." : "Bestätigungs-E-Mail erneut senden"}
			</button>
		</div>
	);
};

export default ConfirmationEmail;
