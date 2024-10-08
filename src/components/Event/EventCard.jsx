import Image from "next/image";
import convertUnixDateToFullDate from "@/helpers/convertUnixDateFullDate";
import convertLongDateToShortDate from "@/helpers/convertLongDatetoShortDate.js";
import Link from "next/link";

const EventCard = ({ eventData }) => {
	const eventImageUrl = eventData?.images[0]?.url ?? "/party.webp";

	const eventDetails = eventData.details;

	const eventLocation = eventData.eventLocation.locationTitle;

	const convertedDate = convertUnixDateToFullDate(eventData.timeFrame);

	const shortDate = convertLongDateToShortDate(convertedDate.openDate);

	return (
		<Link target="_blank" href="/events/[id]" as={`/events/${eventData.itemId}`} className="relative animate-fade transition-transform min-h-80 min-w-80 max-w-96 max-h-96 duration-200 hover:scale-105 flex flex-col justify-end">
			<Image src={eventImageUrl} alt={eventDetails.title} width={400} height={400} className="opacity-60 absolute w-full h-full rounded-2xl bg-center bg-cover object-cover" />
			<div className="mb-5 px-3 py-4 mx-5 rounded-2xl glass_background text-zinc-100 flex flex-col w-auto">
				<p className="flex items-center text-sm text-slate-300">
					{shortDate}&nbsp;<span className="text-2xl">•</span>&nbsp;{convertedDate.openTime}
				</p>
				<h2 className="text-2xl font-semibold my-3">{eventDetails.title}</h2>
				<h2 className="text-sm text-slate-300">{eventLocation}</h2>
			</div>
		</Link>
	);
};

export default EventCard;
