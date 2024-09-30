"use client";

import { useState, useEffect } from "react";
import { reauthenticateUser, deleteUserAccount } from "@/app/libs/getAuth";
import convertFirebaseErrors from "@/helpers/convertFirebaseErrors";
import ContactResponseMessage from "@/components/ContactResponseMessage";
import { useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";
import { useDispatch } from "react-redux";

const DeleteUserAccount = () => {
	const { user, status } = useAuth();

	const dispatch = useDispatch();

	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(false);

	const [message, setMessage] = useState("");

	const [error, setError] = useState(false);

	const router = useRouter();

	const handleDeleteAccount = async (event) => {
		event.preventDefault();
		setLoading(true);
		setMessage("");
		setError(false);

		try {
			// Re-authenticate the user
			const reauthResponse = await reauthenticateUser(password);

			if (reauthResponse !== "success") {
				setError(true);
				setMessage(convertFirebaseErrors(reauthResponse));
				setLoading(false);
				return;
			}

			// Delete the user account
			const deleteResponse = await deleteUserAccount();

			if (deleteResponse === "success") {
				// Optionally, you can redirect or show a success message
				setMessage("Konto erfolgreich gelöscht.");

				setTimeout(() => {
					dispatch(setUser(null));
					router.push("/"); // Redirect to homepage after deletion
				}, 2000);
			} else {
				setError(true);
				setMessage(convertFirebaseErrors(deleteResponse));
			}
		} catch (error) {
			setError(true);
			setMessage("Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.");
			console.error("Error deleting account:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!user && status === "unauthenthicated") {
			router.push("/auth/signin");
		}
	}, [user, router, status]);

	return (
		<>
			<div className="w-full h-full flex justify-center items-center">
				<div className="bg-[#22221f] text-zinc-100 p-6 rounded-lg w-full max-w-md mx-4 my-36">
					<h3 className="text-xl md:text-2xl text-zinc-100 mb-4 text-center">Konto löschen</h3>
					<p className="text-white mb-4">Bitte bestätige dein Passwort, um das Konto zu löschen.</p>
					<form onSubmit={handleDeleteAccount} className="flex flex-col gap-y-4">
						<input type="password" placeholder="Passwort" required className="bg-transparent border border-white rounded-lg py-2 px-3 focus:!shadow-[#CC7503] focus:!shadow-input focus:!outline-offset-0 focus:!outline-none text-white" value={password} onChange={(e) => setPassword(e.target.value)} />
						<div className="mt-6 flex flex-col gap-4">
							<button type="submit" disabled={loading || !password} className="clubbery_main_button hover_button_animation">
								{loading ? "Löschen..." : "Konto löschen"}
							</button>
							<Link href="/profile">
								<button className="clubbery_main_button hover_button_animation w-full">Zurück</button>
							</Link>
						</div>
					</form>
				</div>
			</div>
			{message && <ContactResponseMessage fill={error ? "bg-red-300" : "bg-[#CC7503]"} background={error ? "bg-red-500" : "bg-[#00ff00]"} response={message} />}
		</>
	);
};

export default DeleteUserAccount;
