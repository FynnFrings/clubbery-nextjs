import { useState, useEffect } from "react";
import EventCardMoreInfo from "./EventCardMoreInfo";

const EventCard = ({ handleShowBanner }) => {
	const [showEventMoreInfo, setShowEventMoreInfo] = useState(false);

	const handleShowMoreInfo = () => {
		setShowEventMoreInfo(!showEventMoreInfo);
	};

	useEffect(() => {
		showEventMoreInfo ? window.document.getElementById("body").classList.add("overflow-hidden") : window.document.getElementById("body").classList.remove("overflow-hidden");
	}, [showEventMoreInfo]);

	return (
		<>
			<div className="relative before:absolute before:bg-[url('/party.webp')] before:block before:left-0 before:right-0 before:w-full before:h-full before:opacity-40 before:bg-cover before:bg-no-repeat before:bg-center before:rounded-lg">
				<div className="relative px-5 mt-4 ">
					<h2 className="text-2xl font-semibold mb-20 text-zinc-100 mt-5">Der Name des Events</h2>
					<div className="flex justify-between items-center text-zinc-300">
						<div className="flex items-center text-sm mb-2">
							21 June <span className="mx-2 text-2xl">•</span> 19:00
						</div>
						<p className="text-md">Ab 21 Jahre</p>
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
