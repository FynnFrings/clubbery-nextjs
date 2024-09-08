import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

const EventTicket = ({ ticket, onTicketAmountChange, parentTicketAmount }) => {
	const [ticketCount, setTicketCount] = useState({ ticketId: ticket.id, ticketAmount: parentTicketAmount ?? 0 });

	const handleIncreaseTicketCount = () => {
		if (ticketCount.ticketAmount >= ticket.totalAvailableTicketAmount) return;

		const newTicketAmount = ticketCount.ticketAmount + 1;

		setTicketCount((prevState) => ({
			...prevState,
			ticketAmount: newTicketAmount,
		}));

		onTicketAmountChange(ticket, newTicketAmount);
	};

	const handleDecreaseTicketCount = () => {
		if (ticketCount.ticketAmount <= 0) return;

		const newTicketAmount = ticketCount.ticketAmount - 1;

		setTicketCount((prevState) => ({
			...prevState,
			ticketAmount: newTicketAmount,
		}));

		onTicketAmountChange(ticket, newTicketAmount);
	};

	return (
		<div className="block p-5 rounded-lg shadow-lg bg-[#22221f] text-white">
			<div className="flex flex-col h-full justify-between">
				<h2 className="text-lg md:text-2xl font-semibold mb-2">{ticket.title}</h2>
				<p className="text-md text-zinc-300 mb-4">{ticket.description}</p>
				<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
					<p className="text-base md:text-lg font-medium">Preis: {ticket.price} €</p>
					{/* <p className="text-md text-zinc-300 mt-2 md:mt-0">Verfügbar: {ticket.totalAvailableTicketAmount}</p> */}
				</div>
				{ticket.totalAvailableTicketAmount ? (
					<div className="w-1/3 flex justify-between my-5">
						<button onClick={handleDecreaseTicketCount}>
							<FaMinus className="w-5 h-5" />
						</button>
						<span className="text-lg">{ticketCount.ticketAmount}</span>
						<button onClick={handleIncreaseTicketCount} className="px-2">
							<FaPlus className="w-5 h-5" />
						</button>
					</div>
				) : (
					<p>Ausverkauft</p>
				)}
			</div>
		</div>
	);
};

export default EventTicket;
