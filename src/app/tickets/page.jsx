"use client";

import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getUserFromDatabase } from "../libs/userFirebaseActions";
import TicketProfile from "@/components/Ticket/TicketProfile";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const Tickets = () => {
	const SAVED_EVENTS_DOCUMENT_NAME = process.env.NEXT_PUBLIC_USER_DATABASE_EVENTS_NAME;
	const GET_EVENT_BY_ID = process.env.NEXT_PUBLIC_GET_EVENT_BY_ID;
	const NEXT_PUBLIC_GET_ALL_TICKETS = process.env.NEXT_PUBLIC_GET_ALL_TICKETS;

	const { user, status } = useAuth();
	const router = useRouter();

	const [savedEventsUID, setSavedEventsUID] = useState([]);
	const [savedEvents, setSavedEvents] = useState([]);
	const [purchasedTickets, setPurchasedTickets] = useState([]);
	const [loadingTickets, setLoadingTickets] = useState(true);
	const [errorFetchingTickets, setErrorFetchingTickets] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const ticketsPerPage = 5; // Number of tickets per page

	// Fetch saved event IDs
	useEffect(() => {
		const fetchSavedEventUIDs = async () => {
			if (user) {
				try {
					const userFromFirebase = await getUserFromDatabase(user.uid);
					if (userFromFirebase?.[SAVED_EVENTS_DOCUMENT_NAME]?.length > 0) {
						setSavedEventsUID(userFromFirebase[SAVED_EVENTS_DOCUMENT_NAME]);
					}
				} catch (error) {
					console.error("Error fetching saved events from Firebase:", error);
				}
			}
		};

		if (user) fetchSavedEventUIDs();
	}, [user, SAVED_EVENTS_DOCUMENT_NAME]);

	// Fetch saved event details
	useEffect(() => {
		const fetchSavedEvents = async () => {
			if (savedEventsUID.length > 0) {
				try {
					const eventRequests = savedEventsUID.map((eventUID) => axios.post(GET_EVENT_BY_ID, { id: eventUID }));
					const events = await Promise.all(eventRequests);
					setSavedEvents(events.filter((res) => res.data).map((res) => res.data));
				} catch (error) {
					console.error("Error fetching saved events:", error);
				}
			}
		};

		fetchSavedEvents();
	}, [savedEventsUID, GET_EVENT_BY_ID]);

	// Fetch purchased tickets
	useEffect(() => {
		const fetchPurchasedTickets = async () => {
			if (user && savedEvents.length > 0) {
				try {
					setLoadingTickets(true);
					setErrorFetchingTickets(false);

					const purchasedTickets = await axios.post(NEXT_PUBLIC_GET_ALL_TICKETS, { id: user.uid });

					console.log(purchasedTickets);

					if (!purchasedTickets || purchasedTickets.data.length <= 0) return;

					const ticketsWithEventData = purchasedTickets.data.map((ticketObjekt) => {
						const eventToTicketRelation = savedEvents.find((event) => event.id === ticketObjekt.eventId);
						return eventToTicketRelation ? { ...ticketObjekt, eventData: eventToTicketRelation } : ticketObjekt;
					});

					setPurchasedTickets(ticketsWithEventData);
				} catch (error) {
					setErrorFetchingTickets(true);
					console.error("Error fetching purchased tickets:", error);
				} finally {
					setLoadingTickets(false);
				}
			} else {
				setLoadingTickets(false);
			}
		};

		fetchPurchasedTickets();
	}, [user, savedEvents, NEXT_PUBLIC_GET_ALL_TICKETS]);

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/auth/signin");
		}
	}, [router, status]);

	// Memoize current tickets for pagination
	const currentTickets = useMemo(() => {
		const indexOfLastTicket = currentPage * ticketsPerPage;
		const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
		return purchasedTickets.slice(indexOfFirstTicket, indexOfLastTicket);
	}, [purchasedTickets, currentPage]);

	const totalPages = Math.ceil(purchasedTickets.length / ticketsPerPage);

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage((prev) => prev + 1);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
		}
	};

	return (
		<div className="w-full min-h-screen flex flex-col items-center gap-8 p-6 md:p-12 text-white">
			<h1 className="text-2xl md:text-4xl font-semibold">Deine Tickets</h1>
			<div className="w-full flex flex-col gap-y-5 bg-white bg-opacity-10 p-4 rounded-lg">
				{loadingTickets && <p className="text-lg">Wird aktualisiert...</p>}
				{errorFetchingTickets && <p>Ein Fehler ist aufgetreten. Versuchen Sie es später noch einmal.</p>}
				{!loadingTickets && !errorFetchingTickets && purchasedTickets.length <= 0 && <p>Du hast noch keine Tickets gekauft.</p>}

				{/* Render current tickets */}
				{currentTickets.length > 0 &&
					currentTickets.map((ticketObject) => {
						return <TicketProfile key={ticketObject.id} ticketId={ticketObject.id} ticketObject={ticketObject} />;
					})}

				{/* Pagination Controls */}
				{currentTickets.length > 0 && (
					<div className="flex justify-between items-center mt-4">
						<button onClick={handlePrevPage} disabled={currentPage === 1} className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-clubbery-orange"} text-white`}>
							<SlArrowLeft />
						</button>

						<span className="text-white">
							{currentPage} von {totalPages}
						</span>

						<button onClick={handleNextPage} disabled={currentPage === totalPages} className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-500 cursor-not-allowed" : "bg-clubbery-orange"} text-white`}>
							<SlArrowRight />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Tickets;
