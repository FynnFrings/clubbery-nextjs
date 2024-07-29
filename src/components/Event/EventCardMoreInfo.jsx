import useOutsideClick from "@/app/hooks/useOutsideClick";
import Image from "next/image";

const EventCardMoreInfo = ({ handleShowEventMoreInfo, eventData }) => {
	const handleClickOutside = () => {
		handleShowEventMoreInfo(false);
	};

	const ref = useOutsideClick(handleClickOutside);

	const eventDetails = eventData.details;

	const eventImageUrl = eventData?.images[0]?.url ?? "/party.webp";

	const eventDataLocation = eventData.eventLocation;

	return (
		<div className="glass_background_modal z-30 fixed w-full h-screen top-0 left-1/2 -translate-x-1/2 flex justify-center items-center px-2 md:px-0">
			<div ref={ref} className="bg-gray-600 animate-fade-up animate-duration-200 w-full md:w-3/5 p-5 md:p-10 rounded-xl">
				<Image src={eventImageUrl} alt={eventDetails.title} width={3300} height={2200} lazy="true" className="bg-cover object-cover bg-center rounded-xl w-full h-56" />
				<div className="text-white mt-10 flex flex-col gap-y-4">
					<h2 className="text-2xl">{eventDetails.title}</h2>
					<p>{eventDetails.description}</p>
					{eventDetails.minimumAge && <p>Ab {eventDetails.minimumAge} Jahre</p>}
					<p className="flex items-center">
						{eventDataLocation.locationTitle}&nbsp;<span className="text-2xl">•</span>&nbsp;{eventDataLocation.locationAddress}
					</p>
					<div className="flex gap-x-5">
						<button className="self-center w-1/2 clubbery_main_sm_button hover_button_animation">Ticket kaufen</button>
						<button onClick={handleClickOutside} className="w-1/2 clubbery_secondary_sm_button hover_button_animation">
							Schließen
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventCardMoreInfo;
