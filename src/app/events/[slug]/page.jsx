"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
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
import InteractiveMap from "@/components/InteractiveMap";
import { useDispatch, useSelector } from "react-redux";
import { setSavedTickets } from "@/app/store/useSlice";

const ComingSoonBanner = loadable(() => import("@/components/ComingSoonBanner"));
const ErrorComponent = loadable(() => import("@/components/ErrorComponent"));
const EventTicket = loadable(() => import("@/components/Event/EventTicket"));
const ContactResponseMessage = loadable(() => import("@/components/ContactResponseMessage"));

const EventDetailsPage = ({ params }) => {
	const { user } = useAuth();
	const dispatch = useDispatch();
	const savedTickets = useSelector((state) => state.auth.savedTickets);

	const GET_EVENT_BY_ID = process.env.NEXT_PUBLIC_GET_EVENT_BY_ID;
	const savedEventsDocumentName = process.env.NEXT_PUBLIC_USER_DATABASE_EVENTS_NAME;

	// Fetch event details using SWR
	const fetcher = (...args) =>
		fetch(...args, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: params.slug }),
		}).then((res) => res.json());

	const { data, isLoading, error } = useSWR(GET_EVENT_BY_ID, fetcher);

	const eventInfo = data || null;
	const eventDetails = eventInfo?.details;
	const ticketList = eventInfo?.ticketList;
	const eventLocation = eventInfo?.eventLocation;

	const convertedTimeFrame = eventInfo && convertUnixDateToFullDate(eventInfo.timeFrame);

	// Calculate total available tickets
	const calculateTotalAmount = useCallback((ticketList) => {
		return ticketList.reduce((total, ticket) => total + ticket.totalAvailableTicketAmount, 0);
	}, []);

	const totalAmountOfTickets = useMemo(() => ticketList && calculateTotalAmount(ticketList), [ticketList, calculateTotalAmount]);

	const [open, isOpen] = useState(false);
	const [showBanner, setShowBanner] = useState(false);
	const [message, setMessage] = useState("");
	const [errorResponse, setErrorResponse] = useState(false);
	const [successResponse, setSuccesResponse] = useState(false);
	const [isEventSaved, setIsEventSaved] = useState(false);
	const [ticketAmounts, setTicketAmounts] = useState(savedTickets && Object.values(savedTickets).length > 0 ? savedTickets : {});
	const [loading, setLoading] = useState(false); // Loading state for save actions

	// Show/hide the banner
	const handleShowBanner = () => !showBanner && setShowBanner(true);
	useEffect(() => {
		showBanner && setTimeout(() => setShowBanner(false), 4000);
	}, [showBanner]);

	// Ticket amount change handler, memoized with useCallback
	const handleTicketAmountChange = useCallback(
		(ticket, ticketAmount) => {
			setTicketAmounts((prev) => {
				const updatedTicketAmounts = { ...prev };

				if (ticketAmount === 0) {
					delete updatedTicketAmounts[ticket.id];
				} else {
					updatedTicketAmounts[ticket.id] = { ticketAmount, ticket, eventId: eventInfo?.id };
				}

				return updatedTicketAmounts;
			});
		},
		[eventInfo?.id]
	);

	// Check if the event is still available
	const checkIfEventAvailable = (timestampObj) => {
		const unixTimestamp = timestampObj._seconds;
		const currentTimestamp = Math.floor(Date.now() / 1000);
		return unixTimestamp > currentTimestamp;
	};

	const isEventAvailable = eventInfo && checkIfEventAvailable(eventInfo.timeFrame.endDate);

	// Disable button if no tickets selected or event is unavailable
	const isButtonDisabled = Object.values(ticketAmounts).length <= 0 || Object.values(ticketAmounts).every((ticket) => ticket.ticketAmount === 0) || !isEventAvailable;

	// Dispatch ticket amounts to Redux
	useEffect(() => {
		dispatch(setSavedTickets(ticketAmounts));
	}, [ticketAmounts, dispatch]);

	// Handle click outside to close the banner
	const handleClickOutside = () => isOpen(false);
	const ref = useOutsideClick(handleClickOutside);

	// Save event to user's favorites
	const handleSaveEvent = async () => {
		setLoading(true);
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
			setMessage("Ein unbekannter Fehler ist aufgetreten!");
			setErrorResponse(true);
		} finally {
			setLoading(false);
		}
	};

	// Delete event from user's favorites
	const handleDeleteEvent = async () => {
		setLoading(true);
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
			setMessage("Ein unbekannter Fehler ist aufgetreten!");
			setErrorResponse(true);
		} finally {
			setLoading(false);
		}
	};

	// Feedback for saving/deleting event
	useEffect(() => {
		(errorResponse || successResponse) &&
			setTimeout(() => {
				setErrorResponse(false);
				setSuccesResponse(false);
				setMessage("");
			}, 10000);
	}, [errorResponse, successResponse]);

	// Check if the event is already saved
	useEffect(() => {
		const checkIfEventIsSaved = async () => {
			if (user) {
				const userFromFirebase = await getUserFromDatabase(user.uid);
				setIsEventSaved(userFromFirebase?.[savedEventsDocumentName]?.includes(eventInfo?.id));
			}
		};

		if (eventInfo) checkIfEventIsSaved();
	}, [user, eventInfo, savedEventsDocumentName]);

	if (isLoading) return <LoadingSpinner />;
	if (error) return <ErrorComponent />;

	return (
		<>
			<div className="py-8 grid gap-8 text-white border-b border-gray-700 md:grid-cols-2 md:grid-rows-auto md:gap-4 md:pt-0">
				<div>
					<h1 className="text-2xl">{eventDetails.title}</h1>
					<p>{eventInfo.categoryName}</p>
					<p className="mt-4 opacity-60">{eventDetails.description}</p>
				</div>

				<div className="flex flex-col justify-center items-center md:flex-row md:justify-end md:items-end">
					<button onClick={isEventSaved ? handleDeleteEvent : handleSaveEvent} aria-label={isEventSaved ? "Event gespeichert" : "Event merken"} className="bg-clubbery-orange transition-transform transform active:scale-95 hover:scale-95 w-full md:w-auto flex justify-center items-center py-2 px-4 rounded-md mb-4 md:mb-0 md:mr-2">
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
						{ticketList && (
							<div className="grid grid-cols-1 gap-6">
								{ticketList.map((ticket) => (
									<EventTicket key={ticket.id} ticket={ticket} onTicketAmountChange={handleTicketAmountChange} parentTicketAmount={ticketAmounts[ticket.id]?.ticketAmount} />
								))}
							</div>
						)}

						{user ? (
							<Link href={`/payment_checkout/${eventInfo.id}`}>
								<button aria-label="Kaufen" disabled={isButtonDisabled} className={`clubbery_main_button w-full mt-6 ${isButtonDisabled ? "opacity-60" : "hover_button_animation"}`}>
									Kaufen
								</button>
							</Link>
						) : (
							<button aria-label="Bitte Melden Sie sich an" disabled className={`clubbery_main_button w-full mt-6 opacity-60`}>
								Bitte Melden Sie sich an
							</button>
						)}
					</div>
				</div>
			</div>
			{showBanner && <ComingSoonBanner />}

			{(errorResponse || successResponse) && <ContactResponseMessage fill={errorResponse ? "bg-red-300" : "bg-[#e5bf8d]"} background={errorResponse ? "bg-red-500" : "bg-[#CC7503]"} response={message} />}
		</>
	);
};
export default EventDetailsPage;
