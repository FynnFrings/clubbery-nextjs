"use client";

import { useState, useEffect } from "react";
import { changeUserEmail, reauthenticateUser, userSignOut } from "@/app/libs/getAuth";
import ContactResponseMessage from "@/components/ContactResponseMessage";
import convertFirebaseErrors from "@/helpers/convertFirebaseErrors";
import { useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";
import { useDispatch } from "react-redux";

const ChangeEmail = () => {
	const { user, status } = useAuth();

	const dispatch = useDispatch();

	const router = useRouter();

	const [newEmail, setNewEmail] = useState("");

	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(false);

	const [message, setMessage] = useState("");

	const [error, setError] = useState(false);

	const [successResponse, setSuccesResponse] = useState(false);

	const [step, setStep] = useState(1); // To manage the re-authentication and email change steps

	const handleReauthenticate = async (event) => {
		event.preventDefault();
		setLoading(true);
		setMessage("");
		setError(false);

		try {
			const reauthResponse = await reauthenticateUser(password);
			if (reauthResponse === "success") {
				setStep(2); // Proceed to the email change step after successful re-authentication
			} else {
				setError(true);
				setMessage(convertFirebaseErrors(reauthResponse));
			}
		} catch (error) {
			setError(true);
			setMessage("Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.");
			console.error("Error reauthenticating user:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleChangeEmail = async (event) => {
		event.preventDefault();
		setLoading(true);
		setMessage("");
		setError(false);

		try {
			const response = await changeUserEmail(newEmail);

			if (response === "success") {
				setMessage("E-Mail-Adresse erfolgreich geändert.");
				setSuccesResponse(true);

				setTimeout(async () => {
					// Redirect to the sign-in page after a successful password change
					router.push("/auth/signin");
					dispatch(setUser(null));
					await userSignOut();
				}, 5000);
			} else {
				setError(true);
				setMessage(convertFirebaseErrors(response));
			}
		} catch (error) {
			setError(true);
			setMessage("Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.");
			console.error("Error changing email:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		(error || successResponse) &&
			setTimeout(() => {
				setError(false);
				setSuccesResponse(false);
				setMessage("");
			}, 5000);
	}, [error, successResponse]);

	useEffect(() => {
		if (!user && status === "unauthenthicated") {
			router.push("/auth/signin");
		}
	}, [user, router, status]);

	return (
		<>
			<div className="w-full h-full flex justify-center items-center">
				{!successResponse && step === 1 && (
					// Re-authentication Step
					<div className="bg-[#22221f] text-zinc-100 p-6 rounded-lg w-full max-w-md mx-4 my-36">
						<h3 className="text-xl md:text-2xl text-zinc-100 mb-4 text-center">Verifizieren Sie Ihr Passwort</h3>
						<p className="text-zinc-400 mb-4">Geben Sie Ihr Passwort ein, um die Änderung der E-Mail-Adresse zu bestätigen.</p>
						<form onSubmit={handleReauthenticate} className="flex flex-col gap-y-4">
							<input type="password" placeholder="Passwort" required className="bg-transparent border border-white rounded-lg py-2 px-3 focus:!shadow-[#CC7503] focus:!shadow-input focus:!outline-offset-0 focus:!outline-none text-white" value={password} onChange={(e) => setPassword(e.target.value)} />

							<button type="submit" disabled={loading || !password} className="mt-6 clubbery_main_button hover_button_animation">
								{loading ? "Verifizieren..." : "Weiter"}
							</button>

							<Link href="/profile">
								<button className="clubbery_main_button hover_button_animation w-full">Zurück</button>
							</Link>
						</form>
					</div>
				)}
				{!successResponse && step === 2 && (
					// Email Change Step
					<div className="bg-[#22221f] text-zinc-100 p-6 rounded-lg w-full max-w-md mx-4 my-36">
						<h3 className="text-xl md:text-2xl text-zinc-100 mb-4 text-center">E-Mail-Adresse ändern</h3>
						<form onSubmit={handleChangeEmail} className="flex flex-col gap-y-4">
							<input type="email" placeholder="Neue E-Mail-Adresse" required className="bg-transparent border border-white rounded-lg py-2 px-3 focus:!shadow-[#CC7503] focus:!shadow-input focus:!outline-offset-0 focus:!outline-none text-white" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />

							<button type="submit" disabled={loading || !newEmail} className="mt-6 clubbery_main_button hover_button_animation">
								{loading ? "Aktualisieren..." : "E-Mail ändern"}
							</button>

							<Link href="/profile">
								<button className="clubbery_main_button hover_button_animation w-full">Zurück</button>
							</Link>
						</form>
					</div>
				)}
				{successResponse && (
					<div className="w-full  mx-4 my-36 text-center">
						<p className="text-white text-2xl md:text-3xl font-semibold mb-5">Bestätige deine E-Mail-Adresse</p>
						<p className="text-white text-base md:text-lg">
							Bitte bestätige deine E-Mail-Adresse: <span className="font-semibold">{newEmail}</span>
						</p>
						<p className="text-white text-base md:text-lg">Ein Bestätigungslink wurde an deine E-Mail gesendet.</p>
					</div>
				)}
			</div>
			{(error || successResponse) && <ContactResponseMessage fill={error ? "bg-red-300" : "bg-[#e5bf8d]"} background={error ? "bg-red-500" : "bg-[#CC7503]"} response={message} />}
		</>
	);
};

export default ChangeEmail;
