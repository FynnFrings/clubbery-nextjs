"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
// import BusinessMerkenResponseMessage from "@/components/Business/BusinessMerkenResponseMessage";
// import InteractiveMap from "@/components/interactiveMap";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiBuilding4Fill } from "react-icons/ri";
import { AiFillPieChart } from "react-icons/ai";
import { FaCalendarDays } from "react-icons/fa6";
import { BiSolidCoupon } from "react-icons/bi";
// import PopUpOpener from "@/components/popUpContact";
import useOutsideClick from "@/app/hooks/useOutsideClick";
// import getMonthDifference from "@/helpers/getMonthDifference";
// import hrefValidator from "@/helpers/hrefValidator";
// import weekSchedule from "@/helpers/weekSchedule";

const EventDetailsPage = () => {
	const [alert, isAlert] = useState(false);
	const [open, isOpen] = useState(false);

	const timeoutRef = useRef(null);

	const handleSubmit = (event) => {
		event.preventDefault();
		isAlert(true);

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			isAlert(false);
		}, 3000);
	};

	const handleSubmitEvent = (event) => {
		event.preventDefault();
		isAlert(true);
		setTimeout(() => {
			isAlert(false);
		}, 3000);
	};

	const popUpOpener = () => {
		isOpen(!open);
	};

	const currentDate = new Date();
	// const creationData = new Date(business.createdAt._seconds * 1000 + business.createdAt._nanoseconds / 1000000);
	// const monthsDifference = getMonthDifference(creationData, currentDate);
	const weekDay = currentDate.getDay();

	const businessOpeningHoursPeriods = () => {
		if (!business.openingHourPeriods) {
			return null;
		}
		const result = business.openingHourPeriods.find((day) => day.open.day == weekDay);
		if (result && result.open.time !== "Geschlossen") {
			const openTimeArray = result.open.time.split("");
			openTimeArray?.splice(2, 0, ":");
			const openTime = openTimeArray?.join("");
			return openTime;
		}
	};

	// const businessContacts = {
	// 	instagram: business.instagram ?? null,
	// 	telegram: business.telegram ?? null,
	// 	whatsapp: business.whatsapp ?? null,
	// 	email: business.email ?? null,
	// 	phoneNum: business.number ?? null,
	// };

	const ref = useOutsideClick(handleClickOutside);

	function handleClickOutside() {
		isOpen(false);
	}

	return (
		<>
			<div className="px-10 py-8 grid gap-8 text-white border-b border-gray-700 md:grid-cols-2 md:grid-rows-auto md:gap-4 md:pt-0">
				<Image className="flex justify-center items-center h-56 md:col-span-2 object-cover rounded-lg w-full" src={"/party.webp"} alt="business_image" width={976} height={350} loading="lazy" />

				<div className="">
					<h1 className="text-2xl">Event name</h1>
					<p>
						<spa>Event Category</spa>
						<span className="text-yellow-400">{` Öffnet ${"18:00"} Uhr`}</span>
					</p>
					<p className="mt-4 opacity-60">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui, incidunt asperiores libero illo necessitatibus animi assumenda eius aspernatur iste at, ipsa nemo doloribus voluptatibus. Vitae fugit corrupti eaque ut alias!</p>
				</div>

				<div className="flex flex-col justify-center items-center md:flex-row md:justify-end md:items-end">
					<button onClick={handleSubmit} className="bg-yellow-400 border-yellow-400 transition-transform transform active:scale-95 hover:scale-95 w-full md:w-auto flex justify-center items-center py-2 px-4 rounded-md mb-4 md:mb-0 md:mr-2">
						<IoIosNotificationsOutline className="mr-1" size={24} />
						Merken
					</button>
					{/* {alert && <BusinessMerkenResponseMessage />} */}
					<button onClick={popUpOpener} className="border border-white text-white transition-all active:scale-95 hover:bg-white hover:bg-opacity-10 w-full md:w-auto flex justify-center items-center py-2 px-4 rounded-md" ref={ref}>
						Kontaktieren
					</button>
					{/* {open && <PopUpOpener popUpOpener={popUpOpener} open={open} businessContacts={businessContacts} />} */}
				</div>
			</div>

			<div className="flex flex-col gap-8 px-10 py-8">
				<div className="flex flex-col gap-8 md:flex-row md:justify-between">
					<div className="p-6 bg-white bg-opacity-10 text-white rounded-lg flex flex-col w-full md:2-1/2">
						<h2 className="text-2xl mb-6">Information</h2>
						<p className="flex items-center mb-4 text-lg">
							<RiBuilding4Fill className="mr-3 text-yellow-400" size={28} />
							Event
						</p>
						<p className="flex items-center mb-4 text-lg">
							<AiFillPieChart className="mr-3 text-yellow-400" size={28} />
							Event
						</p>
						<p className="flex items-center mb-4 text-lg">
							<Image alt="" height={28} width={28} className="mr-3 text-yellow-400" src="/shop-remove.svg" /> {2 > 1 ? `seit ${2} Monaten Mitglied der Clubbery App` : `seit ${2} Monat Mitglied der Aachen App`}
						</p>
					</div>

					<div className="p-6 bg-white bg-opacity-10 text-white rounded-lg w-full md:2-1/2">
						<h2 className="text-2xl mb-6">Öffnungszeiten</h2>
						{/* {weekSchedule(business.openingHourPeriods != null ? business.openingHourPeriods : business.dayList)} */}
					</div>
				</div>

				<div className="col-span-2 p-6 bg-white bg-opacity-10 text-white rounded-lg">
					<h2 className="text-2xl mb-6">Standort</h2>
					{/* <InteractiveMap location={business.location} latitude={business.latitude} longitude={business.longitude} /> */}
					<div className="flex flex-col items-start md:items-center md:flex-row mt-4">
						<Link target="_blank" rel="noreferrer" href={`https://maps.google.com/?q=123`} className="bg-yellow-400 text-black py-2 px-4 rounded-md mb-4 md:mb-0 md:mr-4">
							Route planen
						</Link>
						{/* <span>{business.formattedAddress ?? business.location}</span> */}
					</div>
				</div>

				<div className="col-span-2 p-6 bg-white bg-opacity-10 text-white rounded-lg">
					<h2 className="text-2xl mb-6">Soziale Medien</h2>
					<div className="flex items-center mb-6">
						<Image src={"/party.webp"} width={56} height={56} alt="Business logo" className="mr-4" />
						<div>
							<h2 className="text-xl">Website</h2>
							<Link target="_blank" rel="noreferrer" href={`/*`} className="text-yellow-400">
								Unbekannt
							</Link>
						</div>
					</div>
					{true && (
						<div className="flex items-center mb-6">
							<Image src="/instagram_logo.svg" width={56} height={56} alt="instagram logo" className="mr-4" />
							<div>
								<h2 className="text-xl">Instagram</h2>
								<Link target="_blank" rel="noreferrer" href={`https://www.instagram.com/event/`} className="text-yellow-400">
									@Event
								</Link>
							</div>
						</div>
					)}
					{true && (
						<div className="flex items-center">
							<Image src="/whatsApp_logo.svg" width={56} height={56} alt="instagram logo" className="mr-4 rounded-lg" />
							<div>
								<h2 className="text-xl">WhatsApp</h2>
								<Link target="_blank" rel="noreferrer" href={`https://wa.me/event`} className="text-yellow-400">
									Event
								</Link>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
export default EventDetailsPage;
