"use client";

import SearchField from "@/components/InputForms/SearchField";
import filterItemsByName from "@/helpers/filterItemsByName";
import Image from "next/image";
import { useState, useEffect } from "react";
import useSWR from "swr";
import useSWRfetcher from "@/helpers/useSWRfetcher";
import loadable from "@loadable/component";
import LoadingSpinner from "@/components/LoadingSpinner";

function EventPage() {
	const GET_ALL_EVENTS = process.env.NEXT_PUBLIC_GET_ALL_EVENTS;

	const { data, isLoading, error } = useSWR(GET_ALL_EVENTS, useSWRfetcher);

	const [eventsSearchInput, setEventsSearchInput] = useState("");

	const handleInputSearchChange = (event) => {
		setEventsSearchInput(event.target.value);
	};

	const [showBanner, setShowBanner] = useState(false);

	const handleShowBanner = () => {
		!showBanner && setShowBanner(true);
	};

	const sortedEventsBySearchInput = [...(data || [])].filter((event) => filterItemsByName(event.details.title, eventsSearchInput));

	useEffect(() => {
		showBanner &&
			setTimeout(() => {
				setShowBanner(false);
			}, 4000);
	}, [showBanner]);

	const ErrorComponent = loadable(() => import("@/components/ErrorComponent"));
	const ComingSoonBanner = loadable(() => import("@/components/ComingSoonBanner"));
	const EventCard = loadable(() => import("@/components/Event/EventCard"));

	if (isLoading) return <LoadingSpinner />;

	if (error) return <ErrorComponent />;

	return (
		<>
			<div className="flex flex-col gap-y-5">
				{/* <div className="w-full h-32 md:h-56 relative">
					<Image priority src="/party.webp" alt="Events" width={3300} height={2200} className="bg-cover object-cover opacity-60 bg-center rounded-xl w-full h-full" />
					<h1 className="text-white text-5xl absolute top-1/2 left-1/2 -translate-x-1/2">Events</h1>
				</div> */}
				<div>
					<SearchField handleSearchInputChange={handleInputSearchChange} searchInput={eventsSearchInput} searchIputPlaceholder={"Events suchen"} />
				</div>
				<div className="flex flex-wrap justify-center md:justify-start gap-8 mt-5">{sortedEventsBySearchInput && sortedEventsBySearchInput.map((eventData) => <EventCard eventData={eventData} key={eventData.id} handleShowBanner={handleShowBanner} />)}</div>
			</div>
			{showBanner && <ComingSoonBanner />}
		</>
	);
}

export default EventPage;
