import useOutsideClick from "@/app/hooks/useOutsideClick";
import Image from "next/image";

const EventCardMoreInfo = ({ handleShowEventMoreInfo }) => {
	const handleClickOutside = () => {
		handleShowEventMoreInfo(false);
	};

	const ref = useOutsideClick(handleClickOutside);

	return (
		<div className="glass_background_modal z-30 fixed w-full h-screen top-0 left-1/2 -translate-x-1/2 flex justify-center items-center px-2 md:px-0">
			<div ref={ref} className="bg-gray-600 animate-fade-up animate-duration-200 w-full md:w-3/5 p-5 md:p-10 rounded-xl">
				<Image src="/party.webp" alt="Events" width={3300} height={2200} lazy="true" className="bg-cover object-cover bg-center rounded-xl w-full h-56" />
				<div className="text-white mt-10 flex flex-col gap-y-4">
					<h2 className="text-2xl">Der Name des Events</h2>
					<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque, ducimus. Porro ex, nulla mollitia fugit iusto ducimus tenetur et vel! Atque quos nobis officia, sit beatae harum. Praesentium, velit fugiat.</p>
					<p>Ab 21 Jahre</p>
					<p>Neuestraße 127, 45687 Duisburg</p>
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
