import Link from "next/link";
import convertUnixDateToFullDate from "@/helpers/convertUnixDateFullDate";
import convertLongDateToShortDate from "@/helpers/convertLongDatetoShortDate.js";

const TicketProfile = ({ ticketObject, ticketId }) => {
	const eventData = ticketObject?.eventData ?? null;

	const convertedDate = convertUnixDateToFullDate(eventData?.timeFrame);

	const shortDate = convertLongDateToShortDate(convertedDate?.openDate);
	return (
		<div className="bg-[#262730] flex flex-col gap-y-5 md:flex-row justify-between items-center rounded-lg shadow-lg p-4 text-white">
			{/* Event Title */}

			<h2 className="text-lg font-semibold">{eventData?.details?.title ?? ""}</h2>

			{/* Time Information */}
			<p className="flex items-center text-sm text-slate-300">
				{shortDate}&nbsp;<span className="text-2xl">•</span>&nbsp;{convertedDate?.openTime}
			</p>

			{/* Show Ticket Button */}
			<Link href={`tickets/${ticketId}?eventId=${ticketObject.eventId}`} className="bg-[#CC7503] text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition">
				Ticket zeigen
			</Link>
		</div>
	);
};

export default TicketProfile;
