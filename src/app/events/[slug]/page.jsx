"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import InteractiveMap from "@/components/InteractiveMap";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiBuilding4Fill } from "react-icons/ri";
import { AiFillPieChart } from "react-icons/ai";
import { IoPeople } from "react-icons/io5";
import { CgBrowser } from "react-icons/cg";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import useOutsideClick from "@/app/hooks/useOutsideClick";
import ComingSoonBanner from "@/components/ComingSoonBanner";
import useSWRfetcher from "@/helpers/useSWRfetcher";
// import getMonthDifference from "@/helpers/getMonthDifference";
// import hrefValidator from "@/helpers/hrefValidator";
// import weekSchedule from "@/helpers/weekSchedule";
import useSWR from "swr";

const EventDetailsPage = ({ params }) => {
	const GET_EVENT_BY_ID = process.env.NEXT_PUBLIC_GET_EVENT_BY_ID;

	const { data, isLoading, error } = useSWR(`${GET_EVENT_BY_ID}/${params.slug}`, useSWRfetcher);

	console.log("🚀 ~ EventDetailsPage ~ data:", data);
	const [open, isOpen] = useState(false);

	// const handleSubmitEvent = (event) => {
	// 	event.preventDefault();
	// 	isAlert(true);
	// 	setTimeout(() => {
	// 		isAlert(false);
	// 	}, 3000);
	// };

	const popUpOpener = () => {
		isOpen(!open);
	};

	const [showBanner, setShowBanner] = useState(false);

	const handleShowBanner = () => {
		!showBanner && setShowBanner(true);
	};

	useEffect(() => {
		showBanner &&
			setTimeout(() => {
				setShowBanner(false);
			}, 4000);
	}, [showBanner]);

	// const currentDate = new Date();
	// const creationData = new Date(business.createdAt._seconds * 1000 + business.createdAt._nanoseconds / 1000000);
	// const monthsDifference = getMonthDifference(creationData, currentDate);
	// const weekDay = currentDate.getDay();

	// const businessOpeningHoursPeriods = () => {
	// 	if (!business.openingHourPeriods) {
	// 		return null;
	// 	}
	// 	const result = business.openingHourPeriods.find((day) => day.open.day == weekDay);
	// 	if (result && result.open.time !== "Geschlossen") {
	// 		const openTimeArray = result.open.time.split("");
	// 		openTimeArray?.splice(2, 0, ":");
	// 		const openTime = openTimeArray?.join("");
	// 		return openTime;
	// 	}
	// };

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

				<div>
					<h1 className="text-2xl">Event name</h1>
					<p>Event Category</p>
					<p className="mt-4 opacity-60">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui, incidunt asperiores libero illo necessitatibus animi assumenda eius aspernatur iste at, ipsa nemo doloribus voluptatibus. Vitae fugit corrupti eaque ut alias!</p>
				</div>

				<div className="flex flex-col justify-center items-center md:flex-row md:justify-end md:items-end">
					<button onClick={handleShowBanner} className="bg-clubbery-orange transition-transform transform active:scale-95 hover:scale-95 w-full md:w-auto flex justify-center items-center py-2 px-4 rounded-md mb-4 md:mb-0 md:mr-2">
						<IoIosNotificationsOutline className="mr-1" size={27} />
						Merken
					</button>
					{/* {alert && <BusinessMerkenResponseMessage />} */}
					<button onClick={handleShowBanner} className="border border-white text-white transition-all active:scale-95 hover:bg-white hover:bg-opacity-10 w-full md:w-auto text-center py-2 px-4 rounded-md" ref={ref}>
						Kontaktieren
					</button>
				</div>
			</div>

			<div className="flex flex-col gap-8 px-10 py-8">
				<div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
					<div className="p-6 bg-white bg-opacity-10 text-white rounded-lg flex flex-col w-full md:2-1/2">
						<h2 className="text-2xl mb-6">Information</h2>
						<p className="flex items-center mb-4 text-lg">
							<RiBuilding4Fill className="mr-3 text-clubbery-orange" size={28} />
							Event
						</p>
						<p className="flex items-center mb-4 text-lg">
							<AiFillPieChart className="mr-3 text-clubbery-orange" size={28} />
							Event
						</p>
						<p className="flex items-center mb-4 text-lg">
							<IoPeople className="mr-3 w-7 h-7 text-clubbery-orange" /> <span>seit 2 Monate Mitglied der Clubbery App</span>
						</p>
					</div>

					<div className="p-6 bg-white bg-opacity-10 text-white rounded-lg w-full md:2-1/2">
						<h2 className="text-2xl mb-6">Öffnungszeiten</h2>
						<p>Montag: 19:00 - 20:00</p>
						<p>Dienstag: 19:00 - 20:00</p>
						{/* {weekSchedule(business.openingHourPeriods != null ? business.openingHourPeriods : business.dayList)} */}
					</div>
				</div>

				<div className="col-span-2 p-6 bg-white bg-opacity-10 text-white rounded-lg">
					<h2 className="text-2xl mb-6">Standort</h2>
					<InteractiveMap location={"Zouk Germany"} latitude={48.7640493} longitude={9.164021800000002} />
					<div className="flex flex-col items-start md:items-center md:flex-row mt-4">
						<Link target="_blank" rel="noreferrer" href={`https://maps.google.com/?q=123`} className="bg-clubbery-orange text-white py-2 px-4 rounded-md mb-4 md:mb-0 md:mr-4">
							Route planen
						</Link>
						{/* <span>{business.formattedAddress ?? business.location}</span> */}
					</div>
				</div>

				<div className="col-span-2 p-6 bg-white bg-opacity-10 text-white rounded-lg">
					<h2 className="text-2xl mb-6">Soziale Medien</h2>
					<div className="flex items-center mb-6">
						<CgBrowser className="mr-4 h-10 w-10 text-clubbery-orange" />
						<div>
							<h2 className="text-xl">Website</h2>
							<Link target="_blank" rel="noreferrer" href={`/*`} className="text-yellow-400">
								Unbekannt
							</Link>
						</div>
					</div>
					{true && (
						<div className="flex items-center mb-6">
							<FaInstagram className="mr-4 h-10 w-10 text-clubbery-orange" />
							<div>
								<h2 className="text-xl">Instagram</h2>
								<Link target="_blank" rel="noreferrer" href={`https://www.instagram.com/event/`} className="text-yellow-400">
									@Event
								</Link>
							</div>
						</div>
					)}
					{true && (
						<div className="flex items-center ">
							<FaWhatsapp className="mr-4 h-10 w-10 text-clubbery-orange" />
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
			{showBanner && <ComingSoonBanner />}
		</>
	);
};
export default EventDetailsPage;
