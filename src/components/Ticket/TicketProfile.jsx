import Link from "next/link";

const TicketProfile = ({ ticketObject }) => {
	const purchasedTickets = ticketObject;
	return (
		<div className="bg-[#262730] flex flex-col gap-y-5 md:flex-row justify-between items-center rounded-lg shadow-lg p-4 text-white">
			{/* Event Title */}

			<h2 className="text-lg font-semibold">Pablo&apos;s Party</h2>

			{/* Time Information */}
			<div className="flex items-center gap-x-2">
				<p className="text-sm text-gray-300">5. Oktober 2024</p>
				<p className="text-sm text-gray-300">22:00 Uhr</p>
			</div>

			{/* Show Ticket Button */}
			<Link href="ticket/123131231221" className="bg-[#CC7503] text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition">
				Ticket zeigen
			</Link>
		</div>
	);
};

export default TicketProfile;
