import Link from "next/link";

const EventTicket = ({ ticket, handleOnClick }) => {
	return (
		<div className="block p-5 rounded-lg shadow-lg bg-[#22221f] text-white">
			<div className="flex flex-col h-full justify-between">
				<h2 className="text-lg md:text-2xl font-semibold mb-2">{ticket.title}</h2>
				<p className="text-md text-zinc-300 mb-4">{ticket.description}</p>
				<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
					<p className="text-base md:text-lg font-medium">Preis: {ticket.price} €</p>
					<p className="text-md text-zinc-300 mt-2 md:mt-0">Verfügbar: {ticket.totalAvailableTicketAmount}</p>
				</div>

				<button onClick={handleOnClick} className="clubbery_main_button hover_button_animation">
					<Link href={""}>Kaufen</Link>
				</button>
			</div>
		</div>
	);
};

export default EventTicket;
