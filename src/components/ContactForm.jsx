"use client";
import { useEffect, useState, useReducer } from "react";
import ContactResponseMessage from "./ContactResponseMessage";
import sendEmail from "@/app/libs/sendMail";

const ContactForm = () => {
	// Creating state and updating function using `useReducer`
	const [event, updateEvent] = useReducer(
		(prev, next) => {
			return { ...prev, ...next };
		},
		{
			email: "",
			message: "",
			firstname: "",
			lastname: "",
			alert: false,
			isMessageSended: false,
		}
	);
	const [responseMessage, setResponseMessage] = useState({
		backgroundColor: "",
		reponse: "",
		fillColor: "",
	});
	// Handling submit event for form
	const handleSubmit = async (e) => {
		updateEvent({ isMessageSended: true });
		// Prevent to refresh the page
		e.preventDefault();
		// async function to send filled form
		try {
			const req = await sendEmail(event.email, event.message, event.firstname, event.lastname);
			if (req.status === 200) {
				setResponseMessage({
					reponse: "Abgeschickt!",
					backgroundColor: "bg-[#CC7503]",
					fillColor: "bg-[#00ff00]", // f8e5af
				});
			}
		} catch (e) {
			console.log(e);
			setResponseMessage({
				reponse: "Fehlgeschlagen",
				backgroundColor: "bg-red-500",
				fillColor: "bg-red-300",
			});
		} finally {
			// Resetting the `event` state properties back to empty strings on form submission
			updateEvent({ isMessageSended: false });
			updateEvent({ alert: true });
			updateEvent({ email: "" });
			updateEvent({ message: "" });
			updateEvent({ firstname: "" });
			updateEvent({ lastname: "" });
		}
	};

	// Setting variables for alert message props
	const response = responseMessage.reponse;
	const backgroundColor = responseMessage.backgroundColor;
	const fillColor = responseMessage.fillColor;

	//useEffect with timer for closing alert message wich react on "alert" state
	useEffect(() => {
		setTimeout(() => {
			updateEvent({ alert: false });
		}, 5000);
	}, [event.alert]);
	// Rendering the component
	return (
		<>
			<div className="text-white flex flex-col items-center gap-y-14 pt-0 md:pt-10 pb-20">
				<div className="w-full flex flex-col gap-y-8 lg:gap-y-0 lg:flex lg:flex-row lg:justify-around lg:gap-x-6 lg:items-center">
					<div className="w-auto lg:w-1/3">
						<h2 className="font-semibold text-5xl mb-6 text-center lg:text-left">Kontakt</h2>
						<p className="font-light pl-2 lg:pl-0 text-xl lg:text-lg">
							Ein Kontaktformular und so viele Möglichkeiten: Feedback, Verbesserungsvorschläge, Ideen zu Erweiterungen bzw. neuen Funktionen, Supportanfragen, Kontaktaufnahme bezüglich einer Zusammenarbeit oder Investitionsinteresse und vieles mehr. Egal wozu du dich entscheidest, wir
							freuen uns von dir zu hören!
						</p>
					</div>
					<div className="w-full bg-[#22221f] rounded-2xl py-8 px-8 lg:w-1/2">
						{/* Displaying a form for submitting messages */}
						<form onSubmit={handleSubmit} className=" flex flex-col items-center gap-y-8 font-light text-xl">
							<div className="w-full flex flex-col md:flex-row justify-between gap-8">
								<input
									className="w-full bg-transparent border border-white rounded-xl py-4 pl-2 focus:!shadow-[#CC7503] focus:!shadow-input focus:!outline-offset-0 focus:!outline-none"
									type="text"
									placeholder="Vorname"
									required
									value={event.firstname}
									onChange={(e) => updateEvent({ firstname: e.target.value })}
								/>
								<input
									className="w-full bg-transparent border border-white rounded-xl py-4 pl-2 focus:!shadow-[#CC7503] focus:!shadow-input focus:!outline-offset-0 focus:!outline-none"
									type="text"
									placeholder="Nachname"
									value={event.lastname}
									onChange={(e) => updateEvent({ lastname: e.target.value })}
								/>
							</div>
							<div className="w-full">
								<input
									className="w-full bg-transparent border border-white rounded-xl py-4 pl-2 focus:!shadow-[#CC7503] focus:!shadow-input focus:!outline-offset-0 focus:!outline-none"
									type="email"
									placeholder="E-mail"
									required
									value={event.email}
									onChange={(e) => updateEvent({ email: e.target.value })}
								/>
							</div>
							<div className="w-full">
								<textarea
									className="w-full bg-transparent border border-white rounded-xl pl-2 pt-2 pb-20 focus:!shadow-[#CC7503] focus:!shadow-input focus:!outline-offset-0 focus:!outline-none"
									placeholder="Text"
									required
									value={event.message}
									onChange={(e) => updateEvent({ message: e.target.value })}
								/>
							</div>
							<button disabled={event.isMessageSended} className={`${event.isMessageSended ? "bg-[#b07e3d]" : "bg-[#CC7503]"} text-[#F0FDF4] w-[80%] py-2 rounded-xl font-medium text-2xl hover:scale-95 transition duration-200`} type="submit">
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
							</button>
						</form>
					</div>
				</div>
			</div>
			{/* Dispalying alert message depending on event.alert state */}
			{event.alert && <ContactResponseMessage response={response} fill={fillColor} background={backgroundColor} />}
		</>
	);
};

export default ContactForm;
