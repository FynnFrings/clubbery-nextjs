"use client";

import { useState, useEffect } from "react";
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import convertFirebaseErrors from "@/helpers/convertFirebaseErrors";
import { userSignOut } from "@/app/libs/getAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "@/app/hooks/useAuth";
import ContactResponseMessage from "@/components/ContactResponseMessage";
import Link from "next/link";
import { useDispatch } from "react-redux";

const ChangePassword = () => {
	const { user, status } = useAuth();

	const dispatch = useDispatch();

	const router = useRouter();

	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);

	const [loading, setLoading] = useState(false);

	const [error, setError] = useState(false);

	const [success, setSuccess] = useState(false);

	const [message, setMessage] = useState("");

	const handlePasswordChange = async (e) => {
		e.preventDefault();

		setLoading(true);
		setMessage("");

		if (!user.email) {
			setMessage("Fehler: E-Mail des Benutzers nicht verfügbar.");
			setError(true);
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

			setSuccess(true);

			setTimeout(async () => {
				// Redirect to the sign-in page after a successful password change
				router.push("/auth/signin");
				dispatch(setUser(null));
				await userSignOut();
			}, 5000);
		} catch (error) {
			setMessage(convertFirebaseErrors(error.code));
			setError(true);
			console.error(error);
		}

		setLoading(false);
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
				<form onSubmit={handlePasswordChange} className="bg-[#22221f] text-zinc-100 p-6 rounded-lg w-full max-w-md mx-4 my-36">
					<h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">Passwort ändern</h2>

					<div className="flex flex-col gap-4">
						<div className="relative">
							<input required type={showOldPassword ? "text" : "password"} placeholder="Altes Passwort" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="clubbery_input" />
							<button type="button" className="absolute right-3 top-2 text-zinc-200" onClick={() => setShowOldPassword(!showOldPassword)}>
								{showOldPassword ? <FaEye className="h-6 w-6" /> : <FaEyeSlash className="h-6 w-6" />}
							</button>
						</div>

						<div className="relative">
							<input required type={showNewPassword ? "text" : "password"} placeholder="Neues Passwort" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="clubbery_input" />
							<button type="button" className="absolute right-3 top-2 text-zinc-200" onClick={() => setShowNewPassword(!showNewPassword)}>
								{showNewPassword ? <FaEye className="h-6 w-6" /> : <FaEyeSlash className="h-6 w-6" />}
							</button>
						</div>
					</div>

					<button type="submit" className="mt-6 clubbery_main_button hover_button_animation w-full mb-4" disabled={loading}>
						{loading ? "Lädt..." : "Passwort ändern"}
					</button>

					<Link href="/profile">
						<button className="clubbery_main_button hover_button_animation w-full">Zurück</button>
					</Link>
				</form>
			</div>
			{(error || success) && <ContactResponseMessage fill={error ? "bg-red-300" : "bg-[#e5bf8d]"} background={error ? "bg-red-500" : "bg-[#CC7503]"} response={message} />}
		</>
	);
};

export default ChangePassword;
