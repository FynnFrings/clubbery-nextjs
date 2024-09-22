"use client";

import { signUpWithEmail } from "@/app/libs/getAuth";
import ContactResponseMessage from "@/components/ContactResponseMessage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import loadable from "@loadable/component";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import convertFirebaseErrors from "@/helpers/convertFirebaseErrors";

const Signup = () => {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
	const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing/hiding confirm password

	const [loadingScreen, setLoadingScreen] = useState(false); // Loading state for sign-up process

	const [errorAuthMessage, setErrorAuthMessage] = useState("");
	const [errorAuthMessageBanner, setErrorAuthMessageBanner] = useState(false);

	// Show error banner for a limited time
	const handleShowAuthErrorMessage = useCallback(() => {
		if (!errorAuthMessageBanner) {
			setErrorAuthMessageBanner(true);
		}
	}, [errorAuthMessageBanner]);

	// Hide the error message after 10 seconds
	useEffect(() => {
		if (errorAuthMessageBanner) {
			const timer = setTimeout(() => {
				setErrorAuthMessageBanner(false);
				setErrorAuthMessage("");
			}, 10000);

			return () => clearTimeout(timer); // Cleanup the timeout
		}
	}, [errorAuthMessageBanner]);

	// Handle email change
	const handleEmailChange = useCallback((e) => {
		setEmail(e.target.value);
	}, []);

	// Handle password change
	const handlePasswordChange = useCallback((e) => {
		setPassword(e.target.value);
	}, []);

	// Handle confirm password change
	const handleConfirmPasswordChange = useCallback((e) => {
		setConfirmPassword(e.target.value);
	}, []);

	// Sign up with email and password
	const signUpWithCredentials = async (event) => {
		event.preventDefault();

		// Check if passwords match
		if (password !== confirmPassword) {
			setErrorAuthMessage("Passwörter stimmen nicht überein!");
			handleShowAuthErrorMessage();
			return;
		}

		setLoadingScreen(true); // Start loading spinner during sign-up process

		try {
			const response = await signUpWithEmail(email, password); // Assuming signUpWithEmail is your sign-up logic

			if (response === "success") {
				router.push("/profile"); // Redirect to profile after successful sign-up
			} else {
				const errorMessage = convertFirebaseErrors(response);
				setErrorAuthMessage(errorMessage);
				handleShowAuthErrorMessage();
			}
		} catch (error) {
			console.log(error);
			setErrorAuthMessage("Ein unbekannter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
			handleShowAuthErrorMessage();
		} finally {
			setLoadingScreen(false); // Stop loading spinner
		}
	};

	const LoadingSpinner = loadable(() => import("@/components/LoadingSpinner")); // Load spinner lazily

	// Show spinner while the sign-up process is ongoing
	if (loadingScreen) return <LoadingSpinner />;

	return (
		<>
			<div className="w-full flex justify-around items-center gap-36">
				<div className="hidden lg:block relative">
					<div className="-z-10 absolute top-6 left-36 lg:top-6 lg:left-36 xl:top-6 xl:left-48 w-24 h-24 lg:w-36 lg:h-36 bg-violet-500 rounded-full blur-3xl"></div>
					<div className="-z-10 absolute top-24 right-8 lg:top-36 lg:right-6 xl:top-44 xl:right-8 w-24 h-24 lg:w-36 lg:h-36 bg-orange-400 rounded-full blur-3xl"></div>
					<div className="-z-10 absolute bottom-24 left-24 lg:bottom-44 lg:left-32 xl:bottom-48 xl:left-32 w-24 h-24 lg:w-36 lg:h-36 bg-yellow-500 rounded-full blur-3xl"></div>
					<div className="-z-10 absolute -bottom-5 right-14 lg:-bottom-5 lg:right-28 xl:-bottom-5 xl:right-32 w-24 h-24 lg:w-36 lg:h-36 bg-sky-500 rounded-full blur-3xl"></div>
					<Image className="z-10" src="/iphonemockupsclubbery.png" alt="phone" width={1000} height={1300} />
				</div>
				<div className="h-fit w-full lg:w-1/2 bg-[#22221f] rounded-2xl py-8 px-8 flex flex-col gap-y-5">
					<h2 className="text-center text-zinc-100 text-2xl">Registrieren Sie sich mit:</h2>
					<form onSubmit={signUpWithCredentials} className="flex flex-col items-center gap-y-8 font-light text-lg text-zinc-100">
						<input className="w-full bg-transparent border border-white rounded-xl py-2 pl-2 focus:!shadow-[#CC7503] focus:!shadow-input focus:!outline-offset-0 focus:!outline-none" type="email" placeholder="E-mail" required value={email} onChange={handleEmailChange} />

						<div className="relative w-full">
							<input className="w-full bg-transparent border border-white rounded-xl py-2 pl-2 pr-10 focus:!shadow-[#CC7503] focus:!shadow-input focus:!outline-offset-0 focus:!outline-none" type={showPassword ? "text" : "password"} placeholder="Passwort" required value={password} onChange={handlePasswordChange} />
							<button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-400" onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <FaEye className="h-6 w-6" /> : <FaEyeSlash className="h-6 w-6" />}
							</button>
						</div>

						<div className="relative w-full">
							<input className="w-full bg-transparent border border-white rounded-xl py-2 pl-2 pr-10 focus:!shadow-[#CC7503] focus:!shadow-input focus:!outline-offset-0 focus:!outline-none" type={showConfirmPassword ? "text" : "password"} placeholder="Passwort wiederholen" required value={confirmPassword} onChange={handleConfirmPasswordChange} />
							<button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-400" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
								{showConfirmPassword ? <FaEye className="h-6 w-6" /> : <FaEyeSlash className="h-6 w-6" />}
							</button>
						</div>

						<button disabled={!email || !password || !confirmPassword || errorAuthMessageBanner} className={`bg-[#CC7503] text-[#F0FDF4] w-4/5 py-2 rounded-xl font-medium text-xl hover:scale-95 transition duration-200`} type="submit">
							Anmelden
						</button>
					</form>
				</div>
			</div>
			{errorAuthMessageBanner && <ContactResponseMessage fill={"bg-red-300"} background={"bg-red-500"} response={errorAuthMessage} />}
		</>
	);
};

export default Signup;
