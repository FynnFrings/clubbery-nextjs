"use client";
import ComingSoonBanner from "@/components/ComingSoonBanner";
import ErrorComponent from "@/components/ErrorComponent";
import EventCard from "@/components/Event/EventCard";
import SearchField from "@/components/InputForms/SearchField";
import LoadingSpinner from "@/components/LoadingSpinner";
import filterItemsByName from "@/helpers/filterItemsByName";
import Image from "next/image";
import { useState, useEffect } from "react";
import useSWR from "swr";

function EventPage() {
	const fetcher = (...args) => fetch(...args).then((res) => res.json());

	const { data, isLoading, error } = useSWR("https://getallevents-qh42lmu4jq-uc.a.run.app", fetcher);

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

	if (isLoading) return <LoadingSpinner />;

	if (error) return <ErrorComponent />;

	return (
		<>
			<div className="flex flex-col gap-y-5">
				<div className="w-full h-32 md:h-56 relative">
					<Image priority src="/party.webp" alt="Events" width={3300} height={2200} className="bg-cover object-cover opacity-60 bg-center rounded-xl w-full h-full" />
					<h1 className="text-white text-5xl absolute top-1/2 left-1/2 -translate-x-1/2">Events</h1>
				</div>
				<div>
					<SearchField handleSearchInputChange={handleInputSearchChange} searchInput={eventsSearchInput} searchIputPlaceholder={"Events suchen"} />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mt-5">
					{sortedEventsBySearchInput.map((eventData) => (
						<EventCard eventData={eventData} key={eventData.id} handleShowBanner={handleShowBanner} />
					))}
				</div>
			</div>
			{showBanner && <ComingSoonBanner />}
		</>
	);
}

export default EventPage;
