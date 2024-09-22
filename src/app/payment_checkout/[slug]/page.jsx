"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback, useMemo } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import loadable from "@loadable/component";
import { userBuyTicketFirstAPICall } from "@/app/libs/userActions";
import { setSavedTickets } from "@/app/store/useSlice";

const ContactResponseMessage = loadable(() => import("@/components/ContactResponseMessage"));
const EventTicket = loadable(() => import("@/components/Event/EventTicket"));

const PaymentCheckout = ({ params }) => {
	const { user, status } = useAuth();

	const router = useRouter();

	const dispatch = useDispatch();

	const savedTickets = useSelector((state) => state.auth.savedTickets);

	const [allSavedTickets, setAllSavedTickets] = useState(savedTickets && Object.values(savedTickets).length > 0 ? savedTickets : {});

	const [paymentError, setPaymentError] = useState({
		hasError: false,
		message: "",
	});

	// Memoize filteredTickets to avoid recalculations on each render
	const filteredTickets = useMemo(() => {
		return allSavedTickets && Object.values(allSavedTickets).length > 0
			? Object.values(allSavedTickets)
					.filter((ticket) => ticket.eventId === params.slug)
					.map((ticket) => ({
						...ticket,
						ticket: {
							...ticket.ticket,
							selectedAmount: ticket.ticketAmount,
						},
					}))
			: [];
	}, [allSavedTickets, params.slug]);

	const onlyTicketObjects = useMemo(() => filteredTickets.map((ticket) => ticket.ticket), [filteredTickets]);

	// Calculate total price only when allSavedTickets change
	const calculateTotalPrice = useCallback((tickets) => {
		return Object.values(tickets).reduce((totalPrice, ticketObject) => totalPrice + ticketObject.ticketAmount * ticketObject.ticket.price, 0);
	}, []);

	const allTicketsFullPrice = useMemo(() => (filteredTickets.length > 0 ? calculateTotalPrice(filteredTickets) : 0), [filteredTickets, calculateTotalPrice]);

	const handleTicketAmountChange = useCallback(
		(ticket, ticketAmount) => {
			setAllSavedTickets((prev) => {
				if (prev[ticket.id]?.ticketAmount === ticketAmount) {
					return prev;
				}

				const updatedTicketAmounts = { ...prev };

				if (ticketAmount === 0) {
					delete updatedTicketAmounts[ticket.id];
				} else {
					updatedTicketAmounts[ticket.id] = {
						ticketAmount: ticketAmount,
						ticket,
						eventId: params.slug,
					};
				}

				return updatedTicketAmounts;
			});
		},
		[params.slug] // Only re-create the function when `params.slug` changes
	);

	// API call for buying tickets memoized with useCallback
	const handleBuyTickets = useCallback(
		async (event) => {
			event.preventDefault();
			try {
				const response = await userBuyTicketFirstAPICall(user.email, user.uid, params.slug, onlyTicketObjects);

				if (response.status === 200) {
					router.push(response.data.session.url);
				} else {
					setPaymentError({
						hasError: true,
						message: "Bei der Zahlung ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
					});
				}
			} catch (error) {
				setPaymentError({
					hasError: true,
					message: "Bei der Zahlung ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
				});
				console.error("Error during the POST request:", error);
			}
		},
		[user, params.slug, onlyTicketObjects, router]
	);

	useEffect(() => {
		dispatch(setSavedTickets(allSavedTickets));
	}, [allSavedTickets, dispatch]);

	// Redirect unauthenticated users
	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/auth/signin");
		}
	}, [status, router]);

	// Automatically clear payment error after 5 seconds
	useEffect(() => {
		if (paymentError.hasError) {
			const timer = setTimeout(() => {
				setPaymentError({ hasError: false, message: "" });
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [paymentError]);

	// Simple mounted state management
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return <LoadingSpinner />;

	return (
		<>
			<div className="flex flex-col items-center py-8">
				<h1 className="text-white text-2xl md:text-4xl font-semibold mb-8 text-center">Deine Ticketübersicht</h1>

				{filteredTickets.length > 0 ? (
					<div className="bg-white bg-opacity-10 p-5 rounded-lg w-full md:w-1/2 xl:w-1/3 flex flex-col gap-5">
						{filteredTickets.map((ticketObject, index) => (
							<EventTicket key={ticketObject.ticket.id} ticket={ticketObject.ticket} onTicketAmountChange={handleTicketAmountChange} parentTicketAmount={ticketObject?.ticketAmount} />
						))}
					</div>
				) : (
					<p className="text-lg text-white text-center">Keine Tickets verfügbar</p>
				)}

				{/* Kaufen Button at the bottom */}
				{filteredTickets.length > 0 && (
					<div className="mt-10 w-full flex justify-center">
						<button onClick={handleBuyTickets} className="clubbery_main_button hover_button_animation w-full md:w-1/3 py-3 text-lg">
							Kaufen für {allTicketsFullPrice} &euro;
						</button>
					</div>
				)}
			</div>

			{paymentError.hasError && <ContactResponseMessage fill={"bg-red-300"} background={"bg-red-500"} response={paymentError.message} />}
		</>
	);
};

export default PaymentCheckout;
