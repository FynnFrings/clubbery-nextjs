import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import convertUnixDateToFullDate from "@/helpers/convertUnixDateFullDate";
import convertLongDateToShortDate from "@/helpers/convertLongDatetoShortDate.js";
import Link from "next/link";

const EventCard = ({ handleShowBanner, eventData }) => {
	// const [showEventMoreInfo, setShowEventMoreInfo] = useState(false);

	// const handleShowMoreInfo = () => {
	// 	setShowEventMoreInfo(!showEventMoreInfo);
	// };

	const eventImageUrl = eventData?.images[0]?.url ?? "/party.webp";

	const eventDetails = eventData.details;

	const eventLocation = eventData.eventLocation.locationTitle;

	const convertedDate = convertUnixDateToFullDate(eventData.timeFrame);

	const shortDate = convertLongDateToShortDate(convertedDate.openDate);

	// useEffect(() => {
	// 	showEventMoreInfo ? window.document.getElementById("body").classList.add("overflow-hidden") : window.document.getElementById("body").classList.remove("overflow-hidden");
	// }, [showEventMoreInfo]);

	// const EventCardMoreInfoBanner = dynamic(() => import("@/components/Event/EventCardMoreInfo"));

	return (
		// <>
		// 	<div className="relative animate-fade animate-fill-both transition-transform ease-in-out duration duration-200 hover:scale-105">
		// 		<Image src={eventImageUrl} alt={eventDetails.title} width={340} height={100} className="opacity-60 absolute w-full h-full rounded-lg bg-center bg-cover object-cover" />
		// 		<Link target="_blank" href="/events/[id]" as={`/events/${eventData.itemId}`}>
		// 			<div className="relative px-5 pt-4 ">
		// 				<h2 className="text-2xl font-semibold mb-20 text-zinc-100 mt-5">{eventDetails.title}</h2>
		// 				<div className="flex justify-between items-center text-zinc-300">
		// 					<p className="flex items-center text-sm mb-2">
		// 						{shortDate}&nbsp;<span className="text-2xl">•</span>&nbsp;{convertedDate.openTime}
		// 					</p>
		// 					{eventDetails.minimumAge && <p className="text-md">Ab {eventDetails.minimumAge} Jahre</p>}
		// 				</div>
		// 			</div>
		// 		</Link>

		// 		<div className="py-5 px-2 lg:px-5 flex justify-around items-center gap-x-3 lg:gap-x-5 rounded-b-lg glass_background">
		// 			<Link target="_blank" href="/events/[id]" as={`/events/${eventData.itemId}`} className="w-1/2 text-center clubbery_main_sm_button hover_button_animation">
		// 				Ticket kaufen
		// 			</Link>
		// 			<button onClick={handleShowMoreInfo} className="w-1/2 clubbery_secondary_sm_button hover_button_animation">
		// 				More info
		// 			</button>
		// 		</div>
		// 	</div>
		// 	{showEventMoreInfo && <EventCardMoreInfoBanner showEventMoreInfo={showEventMoreInfo} handleShowEventMoreInfo={handleShowMoreInfo} eventData={eventData} />}
		// </>
		<>
			<Link target="_blank" href="/events/[id]" as={`/events/${eventData.itemId}`} className="relative animate-fade transition-transform ease-in-out duration-200 hover:scale-105 h-80 flex flex-col justify-end">
				<Image src={eventImageUrl} alt={eventDetails.title} width={340} height={100} className="opacity-60 absolute w-full h-full rounded-2xl bg-center bg-cover object-cover" />
				<div className="mb-5 px-3 py-4 mx-5 rounded-2xl glass_background text-zinc-100  flex flex-col">
					<p className="flex items-center text-sm text-slate-300">
						{shortDate}&nbsp;<span className="text-2xl">•</span>&nbsp;{convertedDate.openTime}
					</p>
					<h2 className="text-2xl font-semibold my-3">{eventDetails.title}</h2>
					<h2 className="text-sm text-slate-300">{eventLocation}</h2>
				</div>
			</Link>
		</>
	);
};

export default EventCard;
