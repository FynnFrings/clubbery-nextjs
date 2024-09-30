"use client";

import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import ContactResponseMessage from "@/components/ContactResponseMessage";
import { useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";

const ChangeUserDisplayName = () => {
	const { user, status } = useAuth();

	const [newDisplayName, setNewDisplayName] = useState(user?.displayName || "");

	const [loading, setLoading] = useState(false);

	const [error, setError] = useState(false);

	const [success, setSuccess] = useState(false);

	const [message, setMessage] = useState("");

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccess(false);

		try {
			// Update the display name in Firebase Auth
			await updateProfile(user, {
				displayName: newDisplayName,
			});
			setMessage("Benutzername erfolgreich aktualisiert!");
			setSuccess(true);
		} catch (error) {
			setMessage("Fehler beim Aktualisieren des Benutzernamens.");
			setError(true);
			console.error("Error updating displayName:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		(error || success) &&
			setTimeout(() => {
				setError(false);
				setSuccess(false);
				setMessage("");
			}, 5000);
	}, [error, success]);

	useEffect(() => {
		if (!user && status === "unauthenthicated") {
			router.push("/auth/signin");
		}
	}, [user, router, status]);

	return (
		<>
			<div className="w-full h-full flex justify-center items-center">
				<div className="bg-[#22221f] text-zinc-100 p-6 rounded-lg w-full max-w-md mx-4 my-36">
					<h2 className="text-xl md:text-2xl font-semibold text-white mb-4 text-center">Nutzername ändern</h2>
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="block text-white text-base font-book mb-2" htmlFor="displayName">
								Neuer Benutzername
							</label>
							<input type="text" id="displayName" value={newDisplayName} onChange={(e) => setNewDisplayName(e.target.value)} className="clubbery_input" placeholder="Benutzername eingeben" required />
						</div>

						<button type="submit" className={`clubbery_main_button hover_button_animation w-full mb-4 ${loading && "opacity-60 cursor-not-allowed"}`} disabled={loading}>
							{loading ? "Aktualisieren..." : "Speichern"}
						</button>

						<Link href="/profile">
							<button className="clubbery_main_button hover_button_animation w-full">Zurück</button>
						</Link>
					</form>
				</div>
			</div>
			{(error || success) && <ContactResponseMessage fill={error ? "bg-red-300" : "bg-[#e5bf8d]"} background={error ? "bg-red-500" : "bg-[#CC7503]"} response={message} />}
		</>
	);
};

export default ChangeUserDisplayName;
