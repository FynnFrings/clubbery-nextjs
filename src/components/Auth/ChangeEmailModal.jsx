"use client";

import { useState, useEffect } from "react";
import { changeUserEmail, reauthenticateUser, userSignOut } from "@/app/libs/getAuth";
import ContactResponseMessage from "@/components/ContactResponseMessage";
import convertFirebaseErrors from "@/helpers/convertFirebaseErrors";
import useOutsideClick from "@/app/hooks/useOutsideClick";
import { useRouter } from "next/navigation";

const ChangeEmailModal = ({ onClose }) => {
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
					await userSignOut();
				}, 2000);
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
			}, 10000);
	}, [error, successResponse]);

	const ref = useOutsideClick(onClose);

	return (
		<>
			<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
				<div ref={ref} className="w-full max-w-md mx-auto bg-[#22221f] p-6 rounded-lg">
					{step === 1 ? (
						// Re-authentication Step
						<>
							<h3 className="text-2xl text-zinc-100 mb-4">Verifizieren Sie Ihr Passwort</h3>
							<p className="text-zinc-400 mb-4">Geben Sie Ihr Passwort ein, um die Änderung der E-Mail-Adresse zu bestätigen.</p>
							<form onSubmit={handleReauthenticate} className="flex flex-col gap-y-4">
								<input type="password" placeholder="Passwort" required className="bg-transparent border border-white rounded-lg py-2 px-3 focus:!shadow-[#CC7503] focus:!shadow-input focus:!outline-offset-0 focus:!outline-none text-white" value={password} onChange={(e) => setPassword(e.target.value)} />
								<div className="mt-6 flex flex-col md:flex-row md:justify-end gap-4">
									<button className="clubbery_main_button hover_button_animation" onClick={onClose}>
										Abbrechen
									</button>
									<button type="submit" disabled={loading || !password} className="clubbery_main_button hover_button_animation">
										{loading ? "Verifizieren..." : "Weiter"}
									</button>
								</div>
							</form>
						</>
					) : (
						// Email Change Step
						<>
							<h3 className="text-2xl text-zinc-100 mb-4">E-Mail-Adresse ändern</h3>
							<form onSubmit={handleChangeEmail} className="flex flex-col gap-y-4">
								<input type="email" placeholder="Neue E-Mail-Adresse" required className="bg-transparent border border-white rounded-lg py-2 px-3 focus:!shadow-[#CC7503] focus:!shadow-input focus:!outline-offset-0 focus:!outline-none text-white" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
								<div className="mt-6 flex flex-col md:flex-row md:justify-end gap-4">
									<button className="clubbery_main_button hover_button_animation" onClick={onClose}>
										Abbrechen
									</button>
									<button type="submit" disabled={loading || !newEmail} className="clubbery_main_button hover_button_animation">
										{loading ? "Aktualisieren..." : "E-Mail ändern"}
									</button>
								</div>
							</form>
						</>
					)}
				</div>
			</div>
			{(error || successResponse) && <ContactResponseMessage fill={error ? "bg-red-300" : "bg-[#e5bf8d]"} background={error ? "bg-red-500" : "bg-[#CC7503]"} response={message} />}
		</>
	);
};

export default ChangeEmailModal;
