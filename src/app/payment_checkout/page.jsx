"use client";

import TicketCard from "@/components/Ticket/TicketCard";
import { useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";

const PaymentCheckout = () => {
	const savedTickets = useSelector((state) => state.auth.savedTickets);

	const user = useSelector((state) => state.auth.user);

	const [isMounted, setIsMounted] = useState(false);

	const [email, setEmail] = useState("");

	const handleEmailChange = useCallback((e) => {
		setEmail(e.target.value);
	}, []);

	const calculateTotalPrice = (savedTickets) => {
		let totalPrice = 0;

		Object.values(savedTickets).forEach((ticketObject) => {
			const ticketAmount = ticketObject.ticketAmount;
			const ticketPrice = ticketObject.ticket.price;

			totalPrice += ticketAmount * ticketPrice;
		});

		return totalPrice;
	};

	const handleBuyTickets = (event) => {
		event.preventDefault();

		console.log("Purchased!");
	};

	const allTicketsFullPrice = savedTickets && Object.values(savedTickets).length > 0 && calculateTotalPrice(savedTickets);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return <LoadingSpinner />;

	return (
		<form onSubmit={handleBuyTickets} className="flex flex-col items-center py-8">
			<h1 className="text-white text-2xl md:text-4xl font-semibold mb-8 text-center">Deine Ticketübersicht</h1>

			{savedTickets && Object.values(savedTickets).length > 0 ? (
				<div className="bg-white bg-opacity-10 p-5 rounded-lg w-full md:w-1/2 xl:w-1/3 flex flex-col gap-5">
					{Object.values(savedTickets).map((ticketObject, index) => (
						<TicketCard ticketObject={ticketObject} key={index} />
					))}
					{!user && (
						<div className="text-white w-full bg-[#22221f] p-5 rounded-lg">
							<h2 className="text-lg mb-2">E-mail Adresse</h2>
							<input className="w-full bg-transparent border border-white rounded-xl py-2 pl-2 focus:!shadow-[#CC7503] focus:!shadow-input focus:!outline-offset-0 focus:!outline-none" type="email" placeholder="E-mail" required onChange={handleEmailChange} />
						</div>
					)}
				</div>
			) : (
				<p className="text-lg text-white text-center">Keine Tickets verfügbar</p>
			)}

			{/* Kaufen Button at the bottom */}
			{savedTickets && Object.values(savedTickets).length > 0 && (
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
