"use client";

import { handleRedirectResult, signInWithEmail, signInWithGoogle } from "@/app/libs/getAuth";
import ContactResponseMessage from "@/components/ContactResponseMessage";
import convertFirebaseErrors from "@/helpers/convertFirebaseErrors";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

const Signup = () => {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [errorAuthMessage, setErrorAuthMessage] = useState("");
	const [errorAuthMessageBanner, setErrorAuthMessageBanner] = useState(false);

	const handleShowAuthErrorMessage = () => {
		!errorAuthMessageBanner && setErrorAuthMessageBanner(true);
	};

	const handleEmailChange = useCallback((e) => {
		setEmail(e.target.value);
	}, []);

	const handlePasswordChange = useCallback((e) => {
		setPassword(e.target.value);
	}, []);

	const signInGoogle = async () => {
		try {
			await signInWithGoogle();
		} catch (error) {
			console.log(error);
		}
	};

	const signInWithCredentails = useCallback(
		async (event) => {
			event.preventDefault();

			try {
				const response = await signInWithEmail(email, password);
				if (response === "success") {
					router.push("/profile");
				} else {
					const errorMessage = convertFirebaseErrors(response);
					setErrorAuthMessage(errorMessage);
					handleShowAuthErrorMessage();
				}
			} catch (error) {
				console.log(error);
			}
		},
		[email, password]
	);

	useEffect(() => {
		errorAuthMessageBanner &&
			setTimeout(() => {
				setErrorAuthMessageBanner(false);
				setErrorAuthMessage("");
			}, 10000);
	}, [errorAuthMessageBanner]);

	useEffect(() => {
		const handleAsynGetResultFromRedict = async () => {
			try {
				const response = await handleRedirectResult();

				if (response === null) return;

				if (response === "success") {
					router.push("/profile");
				} else {
					const errorMessage = convertFirebaseErrors(response);
					setErrorAuthMessage(errorMessage);
					handleShowAuthErrorMessage();
				}
			} catch (error) {
				console.log(error);
			}
		};
		handleAsynGetResultFromRedict();
	}, []);

	return (
		<>
			<div className="w-full flex justify-between items-center gap-36">
				<div className="hidden lg:block relative">
					<div className="-z-10 absolute top-6 left-36 lg:top-6 lg:left-36 xl:top-6 xl:left-48 w-24 h-24 lg:w-36 lg:h-36 bg-violet-500 rounded-full blur-3xl"></div>
					<div className="-z-10 absolute top-24 right-8 lg:top-36 lg:right-6 xl:top-44 xl:right-8 w-24 h-24 lg:w-36 lg:h-36 bg-orange-400 rounded-full blur-3xl"></div>
					<div className="-z-10 absolute bottom-24 left-24 lg:bottom-44 lg:left-32 xl:bottom-48 xl:left-32 w-24 h-24 lg:w-36 lg:h-36 bg-yellow-500 rounded-full blur-3xl"></div>
					<div className="-z-10 absolute -bottom-5 right-14 lg:-bottom-5 lg:right-28 xl:-bottom-5 xl:right-32 w-24 h-24 lg:w-36 lg:h-36 bg-sky-500 rounded-full blur-3xl"></div>
					<Image className="z-10" src="/iphonemockupsclubbery.png" alt="phone" width={1000} height={1300} />
				</div>
				<div className="h-fit w-full lg:w-1/2 bg-[#22221f] rounded-2xl py-8 px-8 flex flex-col gap-y-5">
					<h2 className="text-center text-zinc-100 text-2xl">Haben Sie schon ein Konto?</h2>
					<div className="w-full flex justify-center">
						<button onClick={signInGoogle}>
							<Image src={"/buttons/google_signin.svg"} alt="Sign up with Google" width={200} height={100} />
						</button>
					</div>

					<p className="text-center flex items-center justify-center">
						<span className="w-1/4 border border-white"></span>
						<span className="font-light text-zinc-100 text-2xl mx-2">Oder</span>
						<span className="w-1/4 border border-white"></span>
					</p>
					<form onSubmit={signInWithCredentails} className="flex flex-col items-center gap-y-8 font-light text-lg text-zinc-100">
						<input className="w-full bg-transparent border border-white rounded-xl py-2 pl-2 focus:!shadow-[#CC7503] focus:!shadow-input focus:!outline-offset-0 focus:!outline-none" type="email" placeholder="E-mail" required onChange={handleEmailChange} />
						<input className="w-full bg-transparent border border-white rounded-xl py-2 pl-2 focus:!shadow-[#CC7503] focus:!shadow-input focus:!outline-offset-0 focus:!outline-none" type="password" placeholder="Passwort" required onChange={handlePasswordChange} />
						<button disabled={!email || !password || errorAuthMessageBanner} className={`bg-[#CC7503] text-[#F0FDF4] w-4/5 py-2 rounded-xl font-medium text-xl hover:scale-95 transition duration-200`} type="submit">
							Anmelden
						</button>
					</form>
					<div className="flex justify-center w-full gap-5">
						<Link href="/auth/signup" className="w-fit">
							<p className="hover_text_animation text-zinc-100">Konto erstellen</p>
						</Link>
						<Link href="/auth/password_recover" className="w-fit">
							<p className="hover_text_animation text-zinc-100">Passwort vergessen</p>
						</Link>
					</div>
				</div>
			</div>
			{errorAuthMessageBanner && <ContactResponseMessage fill={"bg-red-300"} background={"bg-red-500"} response={errorAuthMessage} />}
		</>
	);
};

export default Signup;
