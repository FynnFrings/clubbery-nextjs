"use client";

import { useState } from "react";
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import useOutsideClick from "@/app/hooks/useOutsideClick";
import convertFirebaseErrors from "@/helpers/convertFirebaseErrors";
import { userSignOut } from "@/app/libs/getAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePasswordModal = ({ onClose, user }) => {
	const router = useRouter();

	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handlePasswordChange = async () => {
		setLoading(true);
		setMessage("");

		if (!user.email) {
			setMessage("Fehler: E-Mail des Benutzers nicht verfügbar.");
			setLoading(false);
			return;
		}

		const credential = EmailAuthProvider.credential(user.email, oldPassword);

		try {
			// Reauthenticate the user
			await reauthenticateWithCredential(user, credential);

			// Update the password
			await updatePassword(user, newPassword);

			setMessage("Passwort erfolgreich geändert!");

			setTimeout(async () => {
				// Redirect to the sign-in page after a successful password change
				router.push("/auth/signin");
				await userSignOut();
			}, 2000);
		} catch (error) {
			console.error(error);
			setMessage(convertFirebaseErrors(error.code));
		}

		setLoading(false);
	};

	const ref = useOutsideClick(onClose);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div ref={ref} className="bg-[#22221f] text-zinc-100 p-6 rounded-lg w-full max-w-md mx-4">
				<h2 className="text-2xl font-semibold mb-4">Passwort ändern</h2>

				<div className="flex flex-col gap-4">
					<div className="relative">
						<input type={showOldPassword ? "text" : "password"} placeholder="Altes Passwort" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="clubbery_input" />
						<button type="button" className="absolute right-3 top-2 text-zinc-200" onClick={() => setShowOldPassword(!showOldPassword)}>
							{showOldPassword ? <FaEye className="h-6 w-6" /> : <FaEyeSlash className="h-6 w-6" />}
						</button>
					</div>

					<div className="relative">
						<input type={showNewPassword ? "text" : "password"} placeholder="Neues Passwort" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="clubbery_input" />
						<button type="button" className="absolute right-3 top-2 text-zinc-200" onClick={() => setShowNewPassword(!showNewPassword)}>
							{showNewPassword ? <FaEye className="h-6 w-6" /> : <FaEyeSlash className="h-6 w-6" />}
						</button>
					</div>
				</div>

				{message && <p className={`mt-4 text-${message.includes("erfolgreich") ? "green" : "red"}-500`}>{message}</p>}

				<div className="mt-6  flex flex-col md:flex-row md:justify-end gap-4">
					<button className="clubbery_main_button hover_button_animation" onClick={onClose}>
						Abbrechen
					</button>
					<button className="clubbery_main_button hover_button_animation" onClick={handlePasswordChange} disabled={loading}>
						{loading ? "Lädt..." : "Passwort ändern"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChangePasswordModal;
