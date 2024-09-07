"use client";

import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import useOutsideClick from "@/app/hooks/useOutsideClick";
import ContactResponseMessage from "@/components/ContactResponseMessage";

const ChangeUserDisplayNameModal = ({ user, onClose }) => {
	const [newDisplayName, setNewDisplayName] = useState(user?.displayName || "");

	const [loading, setLoading] = useState(false);

	const [error, setError] = useState(false);

	const [success, setSuccess] = useState(false);

	const [message, setMessage] = useState("");

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

	const ref = useOutsideClick(onClose);

	return (
		<>
			<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
				<div ref={ref} className="bg-[#22221f] p-6 rounded-lg shadow-lg max-w-lg w-full sm:w-4/5 lg:w-1/2">
					<h2 className="text-2xl font-semibold text-white mb-4">Nutzername ändern</h2>
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="block text-white text-sm font-bold mb-2" htmlFor="displayName">
								Neuer Benutzername
							</label>
							<input type="text" id="displayName" value={newDisplayName} onChange={(e) => setNewDisplayName(e.target.value)} className="clubbery_input" placeholder="Benutzername eingeben" required />
						</div>

						<div className="flex justify-end gap-2">
							<button type="button" className="clubbery_main_button hover_button_animation w-full sm:w-auto" onClick={onClose}>
								Abbrechen
							</button>
							<button type="submit" className={`clubbery_main_button hover_button_animation w-full sm:w-auto ${loading && "opacity-60 cursor-not-allowed"}`} disabled={loading}>
								{loading ? "Aktualisieren..." : "Speichern"}
							</button>
						</div>
					</form>
				</div>
			</div>
			{(error || success) && <ContactResponseMessage fill={error ? "bg-red-300" : "bg-[#e5bf8d]"} background={error ? "bg-red-500" : "bg-[#CC7503]"} response={message} />}
		</>
	);
};

export default ChangeUserDisplayNameModal;
