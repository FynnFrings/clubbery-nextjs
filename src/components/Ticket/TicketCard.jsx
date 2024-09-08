"use client";

const TicketCard = ({ ticketObject }) => {
	const ticketInfo = ticketObject;

	return (
		<div className="w-full p-5 rounded-lg shadow-lg bg-[#22221f] text-white transition-all transform hover:scale-105">
			<div className="flex flex-col justify-between space-y-4">
				<h2 className="text-lg md:text-2xl font-semibold mb-2">{ticketInfo.ticket.title}</h2>
				<p className="text-sm md:text-base  mb-4">{ticketInfo.ticket.description}</p>

				<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
					<p className="text-base md:text-lg font-medium">
						Preis: <span>{ticketInfo.ticket.price} €</span>
					</p>
					<p className="text-base md:text-lg font-medium">
						Anzahl: <span>{ticketInfo.ticketAmount}</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default TicketCard;
