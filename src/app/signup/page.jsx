"use client";

import Image from "next/image";
import { useReducer } from "react";
import { FaApple, FaGoogle } from "react-icons/fa";

const Signup = () => {
	const [event, updateEvent] = useReducer(
		(prev, next) => {
			return { ...prev, ...next };
		},
		{
			email: "",
			firstname: "",
			lastname: "",
		}
	);
	return (
		<div className="w-full flex justify-around items-center">
			<div className="hidden lg:block relative">
				<div className="-z-10 absolute top-6 left-36 lg:top-6 lg:left-36 xl:top-6 xl:left-48 w-24 h-24 lg:w-36 lg:h-36 bg-violet-500 rounded-full blur-3xl"></div>
				<div className="-z-10 absolute top-24 right-8 lg:top-36 lg:right-6 xl:top-44 xl:right-8 w-24 h-24 lg:w-36 lg:h-36 bg-orange-400 rounded-full blur-3xl"></div>
				<div className="-z-10 absolute bottom-24 left-24 lg:bottom-44 lg:left-32 xl:bottom-48 xl:left-32 w-24 h-24 lg:w-36 lg:h-36 bg-yellow-500 rounded-full blur-3xl"></div>
				<div className="-z-10 absolute -bottom-5 right-14 lg:-bottom-5 lg:right-28 xl:-bottom-5 xl:right-32 w-24 h-24 lg:w-36 lg:h-36 bg-sky-500 rounded-full blur-3xl"></div>
				<Image className="z-10" src="/iphonemockupsclubbery.png" alt="phone" width={1000} height={1300} />
			</div>
			<div className="h-fit w-full lg:w-3/4 xl:w-1/3 bg-[#22221f] rounded-2xl py-8 px-8 flex flex-col gap-y-5">
				<h2 className="text-center text-zinc-100 text-2xl">Melde dich an mit:</h2>
				{/* Displaying a form for submitting messages */}
				<button className="bg-[#CC7503] w-full py-2 rounded-xl hover:scale-95 transition duration-200 flex items-center justify-center gap-x-3">
					<FaGoogle className="text-[#F0FDF4] font-medium text-2xl" /> <span className="text-[#F0FDF4] font-medium text-xl">Google</span>
				</button>
				<button className="bg-[#CC7503] w-full py-2 rounded-xl hover:scale-95 transition duration-200 flex items-center justify-center gap-x-3">
					<FaApple className="text-[#F0FDF4] font-medium text-2xl" /> <span className="text-[#F0FDF4] font-medium text-xl">Apple</span>
				</button>
				<p className="text-center flex items-center justify-center">
					<span className="w-1/4 border border-white"></span>
					<span className="font-light text-zinc-100 text-2xl mx-2">Oder</span>
					<span className="w-1/4 border border-white"></span>
				</p>
				<form className="flex flex-col items-center gap-y-8 font-light text-lg text-zinc-100">
					<div className="w-full flex flex-col lg:flex-row justify-between gap-5">
						<input className="w-full bg-transparent border border-white rounded-xl py-2 pl-2 focus:!shadow-[#CC7503] focus:!shadow-input focus:!outline-offset-0 focus:!outline-none" type="text" placeholder="Vorname" required value={event.firstname} onChange={(e) => updateEvent({ firstname: e.target.value })} />
						<input className="w-full bg-transparent border border-white rounded-xl py-2 pl-2 focus:!shadow-[#CC7503] focus:!shadow-input focus:!outline-offset-0 focus:!outline-none" type="text" placeholder="Nachname" value={event.lastname} onChange={(e) => updateEvent({ lastname: e.target.value })} />
					</div>
					<div className="w-full">
						<input className="w-full bg-transparent border border-white rounded-xl py-2 pl-2 focus:!shadow-[#CC7503] focus:!shadow-input focus:!outline-offset-0 focus:!outline-none" type="email" placeholder="E-mail" required value={event.email} onChange={(e) => updateEvent({ email: e.target.value })} />
					</div>
					<button className={`bg-[#CC7503] text-[#F0FDF4] w-4/5 py-2 rounded-xl font-medium text-xl hover:scale-95 transition duration-200`} type="submit">
						Anmelden
					</button>
					{/* <button disabled={event.isMessageSended} className={`${event.isMessageSended ? "bg-[#b07e3d]" : "bg-[#CC7503]"} text-[#F0FDF4] w-[80%] py-2 rounded-xl font-medium text-2xl hover:scale-95 transition duration-200`} type="submit">
							{event.isMessageSended ? (
								<div className="w-full flex justify-center items-center">
									<svg className="animate-spin mx-2 h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
								</div>
							) : (
								"Absenden"
							)}
						</button> */}
				</form>
			</div>
		</div>
	);
};

export default Signup;
