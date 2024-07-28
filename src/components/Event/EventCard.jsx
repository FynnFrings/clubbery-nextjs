import { useState, useEffect } from "react";
import EventCardMoreInfo from "./EventCardMoreInfo";
import Image from "next/image";
import convertUnixDateToFullDate from "@/helpers/convertUnixDateFullDate";
import convertLongDateToShortDate from "@/helpers/convertLongDatetoShortDate.js";

const EventCard = ({ handleShowBanner, eventData }) => {
	const [showEventMoreInfo, setShowEventMoreInfo] = useState(false);

	const handleShowMoreInfo = () => {
		setShowEventMoreInfo(!showEventMoreInfo);
	};

	const eventImageUrl = eventData?.images[0]?.url ?? "/party.webp";

	const eventDetails = eventData.details;

	const convertedDate = convertUnixDateToFullDate(eventData.timeFrame);

	const shortDate = convertLongDateToShortDate(convertedDate.openDate);

	useEffect(() => {
		showEventMoreInfo ? window.document.getElementById("body").classList.add("overflow-hidden") : window.document.getElementById("body").classList.remove("overflow-hidden");
	}, [showEventMoreInfo]);

	return (
		<>
			<div className="relative">
				<Image src={eventImageUrl} alt={eventDetails.title} width={340} height={100} className="opacity-60 absolute w-full h-full rounded-lg bg-cover object-cover" />
				<div className="relative px-5 mt-4 ">
					<h2 className="text-2xl font-semibold mb-20 text-zinc-100 mt-5">{eventDetails.title}</h2>
					<div className="flex justify-between items-center text-zinc-300">
						<div className="flex items-center text-sm mb-2">
							{shortDate}&nbsp;<span className="text-2xl">•</span>&nbsp;{convertedDate.openTime}
						</div>
						{eventDetails.minimumAge && <p className="text-md">Ab {eventDetails.minimumAge} Jahre</p>}
					</div>
					{/* <p className="text-neutral-50 text-xs font-light mt-20 mb-1">Glabacher Straße 200, 47980 Krefeld</p> */}
				</div>

				<div className="relative py-5 px-2 lg:px-5 flex justify-around items-center gap-x-3 lg:gap-x-5 rounded-b-lg glass_background">
					<button onClick={handleShowBanner} className="w-1/2 clubbery_main_sm_button hover_button_animation">
						Ticket kaufen
					</button>
					<button onClick={handleShowMoreInfo} className="w-1/2 clubbery_secondary_sm_button hover_button_animation">
						More info
					</button>
				</div>
			</div>
			{showEventMoreInfo && <EventCardMoreInfo showEventMoreInfo={showEventMoreInfo} handleShowEventMoreInfo={handleShowMoreInfo} />}
		</>
	);
};

export default EventCard;
