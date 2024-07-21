"use client";
import ComingSoonBanner from "@/components/ComingSoonBanner";
import EventCard from "@/components/Event/EventCard";
import SearchField from "@/components/InputForms/SearchField";
import Image from "next/image";
import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args, { headers: { "Access-Control-Allow-Origin": "*ﬁ" } }).then((res) => res.json());

function EventPage() {
	// const { data, isLoading, error } = useSWR("https://getallevents-qh42lmu4jq-uc.a.run.app", fetcher);
	// console.log("🚀 ~ EventPage ~ data:", data);
	// console.log("🚀 ~ EventPage ~ error:", error);

	const [eventsSearchInput, setEventsSearchInput] = useState("");

	const handleInputSearchChange = (event) => {
		setEventsSearchInput(event.target.value);
	};

	const [showBanner, setShowBanner] = useState(false);

	const handleShowBanner = () => {
		!showBanner && setShowBanner(true);
	};

	useEffect(() => {
		showBanner &&
			setTimeout(() => {
				setShowBanner(false);
			}, 4000);
	}, [showBanner]);

	// if (isLoading) return <div>Loading</div>;

	// if (error) return <div>Error</div>;

	return (
		<>
			<div className="flex flex-col gap-y-5">
				<div className="w-full h-32 md:h-56 relative">
					<Image src="/party.webp" alt="Events" width={3300} height={2200} className="bg-cover object-cover opacity-60 bg-center rounded-xl w-full h-full" />
					<h1 className="text-white text-5xl absolute top-1/2 left-1/2 -translate-x-1/2">Events</h1>
				</div>
				<div>
					<SearchField handleSearchInputChange={handleInputSearchChange} searchInput={eventsSearchInput} searchIputPlaceholder={"Search"} />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 ">
					<EventCard handleShowBanner={handleShowBanner} />
					<EventCard handleShowBanner={handleShowBanner} />
					<EventCard handleShowBanner={handleShowBanner} />
					<EventCard handleShowBanner={handleShowBanner} />
					<EventCard handleShowBanner={handleShowBanner} />
					<EventCard handleShowBanner={handleShowBanner} />
				</div>
			</div>
			{showBanner && <ComingSoonBanner />}
		</>
	);
}

export default EventPage;
