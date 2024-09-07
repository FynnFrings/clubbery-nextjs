"use client";

import TicketCard from "@/components/Ticket/TicketCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";

const PaymentCheckout = () => {
	const savedTickets = useSelector((state) => state.auth.savedTickets);

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

	const allTicketsFullPrice = savedTickets && Object.values(savedTickets).length > 0 && calculateTotalPrice(savedTickets);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return <LoadingSpinner />;

	return (
		<div className="flex flex-col items-center py-8">
			<h1 className="text-white text-2xl md:text-4xl font-semibold mb-8 text-center">Deine Ticketübersicht</h1>

			{savedTickets && Object.values(savedTickets).length > 0 ? (
				<div className="bg-white bg-opacity-10 p-5 rounded-lg w-full md:w-1/2 xl:w-1/3 flex flex-col gap-5">
					{Object.values(savedTickets).map((ticketObject, index) => (
						<TicketCard ticketObject={ticketObject} key={index} />
					))}
				</div>
			) : (
				<p className="text-lg text-white text-center">Keine Tickets verfügbar</p>
			)}

			{/* Kaufen Button at the bottom */}
			{savedTickets && Object.values(savedTickets).length > 0 && (
				<div className="mt-10 w-full flex justify-center">
					<Link href="#" className="clubbery_main_button hover_button_animation w-full md:w-1/3 py-3 text-lg">
						Kaufen für {allTicketsFullPrice ?? 0} &euro;
					</Link>
				</div>
			)}
		</div>
	);
};

export default PaymentCheckout;
