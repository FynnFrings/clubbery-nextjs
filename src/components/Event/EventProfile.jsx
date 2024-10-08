import Link from "next/link";

const EventProfile = ({ event }) => {
	return (
		<Link href={`/events/${event.itemId}`}>
			<div style={{ backgroundImage: `url(${event.images[0].url}})` }} className="p-4 h-48 rounded-lg flex justify-center items-center bg-cover bg-center bg-blend-darken bg-[#0000004f] transition-transform duration-200 hover:scale-95">
				<h3 className="text-lg font-semibold mb-2">{event.details.title}</h3>
			</div>
		</Link>
	);
};

export default EventProfile;
