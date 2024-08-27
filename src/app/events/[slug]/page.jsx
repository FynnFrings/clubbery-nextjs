"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { RiBuilding4Fill } from "react-icons/ri";
import { AiFillPieChart } from "react-icons/ai";
import { CgBrowser } from "react-icons/cg";
import { BiSolidCoupon } from "react-icons/bi";
import { FaInstagram, FaRegBookmark, FaWhatsapp, FaBookmark } from "react-icons/fa";
import useOutsideClick from "@/app/hooks/useOutsideClick";
import useSWR from "swr";
import LoadingSpinner from "@/components/LoadingSpinner";
import convertUnixDateToFullDate from "@/helpers/convertUnixDateFullDate";
import loadable from "@loadable/component";
import { getUserFromDatabase, saveEventToUserFavorites, deleteEventFromUserFavorites } from "@/app/libs/userFirebaseActions";
import useAuth from "@/app/hooks/useAuth";
import convertFirebaseErrors from "@/helpers/convertFirebaseErrors";
// import getMonthDifference from "@/helpers/getMonthDifference";
// import hrefValidator from "@/helpers/hrefValidator";
// import weekSchedule from "@/helpers/weekSchedule";

const EventDetailsPage = ({ params }) => {
	const { user } = useAuth();

	const GET_EVENT_BY_ID = process.env.NEXT_PUBLIC_GET_EVENT_BY_ID;

	const fetcher = (...args) =>
		fetch(...args, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: params.slug }),
		}).then((res) => res.json());

	const { data, isLoading, error } = useSWR(GET_EVENT_BY_ID, fetcher);

	const eventInfo = data ? data : null;

	const eventDetails = data && data?.details;

	const ticketList = data && data?.ticketList;

	const eventImage = data && data.images[0];

	const eventLocation = data && data.eventLocation;

	const convertedTimeFrame = eventInfo && convertUnixDateToFullDate(eventInfo.timeFrame);

	const calculateTotalAmount = (ticketList) => {
		return ticketList.reduce((total, ticket) => {
			return total + ticket.totalAvailableTicketAmount;
		}, 0);
	};

	const totalAmountOfTickets = useMemo(() => ticketList && calculateTotalAmount(ticketList), [ticketList]);

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

	const [message, setMessage] = useState("");

	const [errorResponse, setErrorResponse] = useState(false);

	const [successResponse, setSuccesResponse] = useState(false);

	const [isEventSaved, setIsEventSaved] = useState(false);

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

	const handleClickOutside = () => {
		isOpen(false);
	};

	const ref = useOutsideClick(handleClickOutside);

	const handleSaveEvent = async () => {
		try {
			if (!user) {
				setMessage("Bitte melden Sie sich an!");
				setErrorResponse(true);
				return;
			}

			const response = await saveEventToUserFavorites(eventInfo.id, user);

			if (response === "success") {
				setMessage("Das Event wurde gespeichert!");
				setSuccesResponse(true);
				setIsEventSaved(true);
			} else {
				setMessage(convertFirebaseErrors(response));
				setErrorResponse(true);
			}
		} catch (error) {
			console.log(error);
			setMessage("Ein unbekannter Fehler ist aufgetreten!");
			setErrorResponse(true);
		}
	};

	const handleDeleteEvent = async () => {
		try {
			if (!user) {
				setMessage("Bitte melden Sie sich an!");
				setErrorResponse(true);
				return;
			}

			const response = await deleteEventFromUserFavorites(eventInfo.id, user);

			if (response === "success") {
				setMessage("Das Event wurde entfernt!");
				setSuccesResponse(true);
				setIsEventSaved(false);
			} else {
				setMessage(convertFirebaseErrors(response));
				setErrorResponse(true);
			}
		} catch (error) {
			console.log(error);
			setMessage("Ein unbekannter Fehler ist aufgetreten!");
			setErrorResponse(true);
		}
	};

	useEffect(() => {
		(errorResponse || successResponse) &&
			setTimeout(() => {
				setErrorResponse(false);
				setSuccesResponse(false);
				setMessage("");
			}, 10000);
	}, [errorResponse, successResponse]);

	useEffect(() => {
		const checkIfEventIsSaved = async () => {
			if (user) {
				const userFromFirebase = await getUserFromDatabase(user.uid);

				if (userFromFirebase && userFromFirebase.favouriteEvents) {
					// Check if the event is saved in the user's favourites
					setIsEventSaved(userFromFirebase.favouriteEvents.includes(eventInfo?.id));
				}
			}
		};

		if (eventInfo) {
			checkIfEventIsSaved();
		}
	}, [user, eventInfo]);

	const ComingSoonBanner = loadable(() => import("@/components/ComingSoonBanner"));
	const ErrorComponent = loadable(() => import("@/components/ErrorComponent"));
	const InteractiveMap = loadable(() => import("@/components/InteractiveMap"));
	const EventTicket = loadable(() => import("@/components/Event/EventTicket"));
	const ContactResponseMessage = loadable(() => import("@/components/ContactResponseMessage"));

	if (isLoading) return <LoadingSpinner />;

	if (error) return <ErrorComponent />;

	return (
		<>
			<div className=" py-8 grid gap-8 text-white border-b border-gray-700 md:grid-cols-2 md:grid-rows-auto md:gap-4 md:pt-0">
				<div className="flex justify-center items-center  md:col-span-2 ">
					<Image className=" aspect-video object-cover rounded-lg " src={eventImage.url} alt={eventImage.path} width={1200} height={675} priority />
				</div>
				<div>
					<h1 className="text-2xl">{eventDetails.title}</h1>
					<p>{eventInfo.categoryName}</p>
					<p className="mt-4 opacity-60">{eventDetails.description}</p>
				</div>

				<div className="flex flex-col justify-center items-center md:flex-row md:justify-end md:items-end">
					<button onClick={isEventSaved ? handleDeleteEvent : handleSaveEvent} className="bg-clubbery-orange transition-transform transform active:scale-95 hover:scale-95 w-full md:w-auto flex justify-center items-center py-2 px-4 rounded-md mb-4 md:mb-0 md:mr-2">
						{isEventSaved ? <FaBookmark className="mr-1" size={27} /> : <FaRegBookmark className="mr-1" size={27} />}
						{isEventSaved ? "Gespeichert" : "Merken"}
					</button>
					{/* {alert && <BusinessMerkenResponseMessage />} */}
					<button onClick={handleShowBanner} className="border border-white text-white transition-all active:scale-95 hover:bg-white hover:bg-opacity-10 w-full md:w-auto text-center py-2 px-4 rounded-md" ref={ref}>
						Kontaktieren
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-x-8 py-8 w-full">
				<div className="col-span-2 flex flex-col gap-8 lg:flex-row lg:justify-between">
					<div className="p-6 bg-white bg-opacity-10 text-white rounded-lg flex flex-col w-full md:2-1/2">
						<h2 className="text-2xl mb-6">Information</h2>
						<p className="flex items-center mb-4 text-lg">
							<RiBuilding4Fill className="mr-3 text-clubbery-orange" size={28} />
							{eventInfo.creatorName}
						</p>
						<p className="flex items-center mb-4 text-lg">
							<AiFillPieChart className="mr-3 text-clubbery-orange" size={28} />
							{eventInfo.categoryName}
						</p>
						<p className="flex items-center mb-4 text-lg">
							<BiSolidCoupon className="mr-3 text-clubbery-orange" size={28} />
							{totalAmountOfTickets <= 0 ? "Alle Ticket sind ausverkauft" : `${totalAmountOfTickets} Ticket verfügbar`}
						</p>
						{/* <p className="flex items-center mb-4 text-lg">
							<IoPeople className="mr-3 w-7 h-7 text-clubbery-orange" /> <span>seit 2 Monate Mitglied der Clubbery App</span>
						</p> */}
					</div>

					<div className="p-6 bg-white bg-opacity-10 text-white rounded-lg w-full">
						<h2 className="text-2xl mb-6">Öffnungszeiten</h2>
						<p className="text-base md:text-xl flex flex-wrap gap-1">
							<span>
								{convertedTimeFrame.openTime}&nbsp;Uhr&nbsp;{convertedTimeFrame.openDate}
							</span>
							<span>&mdash;</span>
							<span>
								{convertedTimeFrame.closeTime}&nbsp;Uhr&nbsp;{convertedTimeFrame.closeDate}
							</span>
						</p>
						{/* {weekSchedule(business.openingHourPeriods != null ? business.openingHourPeriods : business.dayList)} */}
					</div>
				</div>

				<div className="col-span-2 p-6 bg-white bg-opacity-10 text-white rounded-lg">
					<h2 className="text-2xl mb-6">Standort</h2>
					<InteractiveMap location={eventLocation.locationTitle} latitude={eventLocation.latitude} longitude={eventLocation.longitude} />
					<div className="flex flex-col gap-2 items-start md:items-center md:flex-row mt-4">
						<Link target="_blank" rel="noreferrer" href={`https://maps.google.com/?q=${eventLocation.locationTitle}`}>
							<button className="clubbery_main_sm_button hover_button_animation">Route planen</button>
						</Link>
						<span>{eventLocation.locationAddress}</span>
					</div>
				</div>

				{eventInfo.website && (
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
				)}
				<div className="col-span-1 md:col-start-3 md:row-start-1 md:row-end-3 md:col-end-3">
					<div className="p-6 bg-white bg-opacity-10 text-white rounded-lg h-auto md:sticky md:top-24">
						<h2 className="text-2xl mb-6">Tickets</h2>
						<div className="grid grid-cols-1 gap-6">{ticketList && ticketList.map((ticket) => <EventTicket key={ticket.id} ticket={ticket} handleOnClick={handleShowBanner} />)}</div>
					</div>
				</div>
			</div>
			{showBanner && <ComingSoonBanner />}

			{(errorResponse || successResponse) && <ContactResponseMessage fill={errorResponse ? "bg-red-300" : "bg-[#e5bf8d]"} background={errorResponse ? "bg-red-500" : "bg-[#CC7503]"} response={message} />}
		</>
	);
};
export default EventDetailsPage;
