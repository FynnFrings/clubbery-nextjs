"use client";

import TicketCard from "@/components/Ticket/TicketCard";
import { useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import axios from "axios";
import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";

const PaymentCheckout = ({ params }) => {
	const { user, status } = useAuth();
	console.log("🚀 ~ PaymentCheckout ~ user:", user);

	const router = useRouter();

	const savedTickets = useSelector((state) => state.auth.savedTickets);

	const filteredTickets =
		savedTickets && Object.values(savedTickets).length > 0
			? Object.values(savedTickets)
					.filter((ticket) => ticket.eventId === params.slug)
					.map((ticket) => ({
						...ticket,
						ticket: {
							...ticket.ticket,
							selectedAmount: ticket.ticketAmount,
						},
					}))
			: [];

	const [isMounted, setIsMounted] = useState(false);

	const calculateTotalPrice = (savedTickets) => {
		let totalPrice = 0;

		Object.values(savedTickets).forEach((ticketObject) => {
			const ticketAmount = ticketObject.ticketAmount;
			const ticketPrice = ticketObject.ticket.price;

			totalPrice += ticketAmount * ticketPrice;
		});

		return totalPrice;
	};

	const onlyTicketObjects = filteredTickets.map((ticket) => ticket.ticket);

	const handleBuyTickets = async (event) => {
		event.preventDefault();

		const requestBody = {
			email: user.email,
			firebaseCustomerId: user.uid,
			voucherCode: null,
			eventId: params.slug,
			items: [...onlyTicketObjects],
		};

		try {
			const response = await axios.post(
				"https://stripepaymentintentrequest-qh42lmu4jq-uc.a.run.app",
				requestBody, // Pass the requestBody as the body
				{
					headers: {
						Accept: "application/json, text/plain, */*",
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
				}
			);
			console.log("Response:", response);
		} catch (error) {
			console.error("Error during the POST request:", error);
		}
	};

	const allTicketsFullPrice = filteredTickets && filteredTickets.length > 0 && calculateTotalPrice(savedTickets);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (status === "unauthenthicated") {
			router.push("/auth/signin");
		}
	});

	if (!isMounted) return <LoadingSpinner />;

	return (
		<form onSubmit={handleBuyTickets} className="flex flex-col items-center py-8">
			<h1 className="text-white text-2xl md:text-4xl font-semibold mb-8 text-center">Deine Ticketübersicht</h1>

			{filteredTickets && filteredTickets.length > 0 ? (
				<div className="bg-white bg-opacity-10 p-5 rounded-lg w-full md:w-1/2 xl:w-1/3 flex flex-col gap-5">
					{Object.values(filteredTickets).map((ticketObject, index) => (
						<TicketCard ticketObject={ticketObject} key={index} />
					))}
				</div>
			) : (
				<p className="text-lg text-white text-center">Keine Tickets verfügbar</p>
			)}

			{/* Kaufen Button at the bottom */}
			{filteredTickets && filteredTickets.length > 0 && (
				<div className="mt-10 w-full flex justify-center">
					<button type="submit" className="clubbery_main_button hover_button_animation w-full md:w-1/3 py-3 text-lg">
						Kaufen für {allTicketsFullPrice ?? 0} &euro;
					</button>
				</div>
			)}
		</form>
	);
};

export default PaymentCheckout;
