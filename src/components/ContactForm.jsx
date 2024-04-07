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
		}
	);
	const [responseMessage, setResponseMessage] = useState({
		backgroundColor: "",
		reponse: "",
		fillColor: "",
	});
	// Handling submit event for form
	const handleSubmit = async (e) => {
		// Prevent to refresh the page
		e.preventDefault();
		// async function to send filled form
		try {
			const req = await sendEmail(event.email, event.message, event.firstname, event.lastname);
			if (req.status === 200) {
				setResponseMessage({
					reponse: "Abgeschickt!",
					backgroundColor: "bg-[#CC7503]",
					fillColor: "bg-[#f8e5af]",
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
			updateEvent({ email: "" });
			updateEvent({ message: "" });
			updateEvent({ firstname: "" });
			updateEvent({ lastname: "" });
			updateEvent({ alert: true });
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
			<div className="text-white flex flex-col items-center gap-y-14 py-20">
				<h2 className="block text-5xl font-bold lg:hidden ">Kontakt</h2>
				<div className="w-full lg:flex lg:flex-row-reverse lg:justify-around lg:gap-x-6 lg:items-center">
					<div className="w-full bg-[#22221f] rounded-2xl py-8 px-8 lg:w-[55%]">
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
							<button className="bg-[#CC7503] text-[#F0FDF4] w-[80%] py-2 rounded-xl font-medium text-2xl hover:scale-95 transition duration-200" type="submit">
								Absenden
							</button>
						</form>
					</div>
					<div className="hidden lg:block lg:w-[35%]">
						<h2 className="font-semibold text-5xl mb-6">Kontakt</h2>
						<p className="font-light text-lg">Hier können Sie uns erreichen! Schreiben Sie uns eine E-Mail oder nutzen Sie das Kontaktformular, um mit uns in Verbindung zu treten. Wir freuen uns auf Ihre Nachricht!</p>
					</div>
				</div>
			</div>
			{/* Dispalying alert message depending on event.alert state */}
			{event.alert && <ContactResponseMessage response={response} fill={fillColor} background={backgroundColor} />}
		</>
	);
};

export default ContactForm;