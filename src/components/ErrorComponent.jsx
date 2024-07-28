"use client";
import { useRouter } from "next/navigation";

const ErrorComponent = () => {
	const router = useRouter();
	return (
		<div className="w-full h-screen flex flex-col gap-y-5 justify-center items-center">
			<h2 className="text-xl text-white">Ein Fehler ist aufgetreten!</h2>
			<button className="clubbery_main_button" onClick={router.refresh()}>
				Nochmal versuchen
			</button>
		</div>
	);
};

export default ErrorComponent;
