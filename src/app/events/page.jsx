"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import useSWR from "swr";
import SearchField from "@/components/InputForms/SearchField";
import filterItemsByName from "@/helpers/filterItemsByName";
import useSWRfetcher from "@/helpers/useSWRfetcher";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorComponent from "@/components/ErrorComponent";
import ComingSoonBanner from "@/components/ComingSoonBanner";
import EventCard from "@/components/Event/EventCard";
import SelectDropdown from "@/components/InputForms/DropdownSelection/SelectDropdown";
import filterItemsByDate from "@/helpers/filterItemsByDate";
import { paginateItems } from "@/helpers/paginateItems";
import Pagination from "@/components/Pagination";

function EventPage() {
	const GET_ALL_EVENTS = process.env.NEXT_PUBLIC_GET_ALL_EVENTS;

	const { data, isLoading, error } = useSWR(GET_ALL_EVENTS, useSWRfetcher);

	const [eventsSearchInput, setEventsSearchInput] = useState("");

	const [currentPage, setCurrentPage] = useState(1);

	const [showBanner, setShowBanner] = useState(false);

	const [selectDate, setSelectDate] = useState("vom neusten zu ältesten");

	const pageSize = 9;

	// Debounced search input handler to improve performance
	const handleInputSearchChange = useCallback((event) => {
		setEventsSearchInput(event.target.value);
	}, []);

	const itemSelectionDate = (item) => {
		setSelectDate(item);
	};

	const onPageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleShowBanner = () => {
		if (!showBanner) {
			setShowBanner(true);
			setTimeout(() => {
				setShowBanner(false);
			}, 4000);
		}
	};

	const dateSelectItem = ["vom neusten zu ältesten", "vom ältesten zu neusten"];

	// Filter events by search input
	const filteredEvents = useMemo(() => data?.sort((a, b) => filterItemsByDate(selectDate, a, b)).filter((event) => filterItemsByName(event.details.title, eventsSearchInput)) || [], [data, eventsSearchInput, selectDate]);

	const paginatedEvents = useMemo(() => paginateItems(filteredEvents, currentPage, pageSize), [filteredEvents, currentPage, pageSize]);

	if (isLoading) return <LoadingSpinner />;
	if (error) return <ErrorComponent />;

	return (
		<>
			<div className="flex flex-col gap-y-5 mt-10">
				<div className="w-full flex flex-col gap-5 md:flex-row md:justify-between">
					<SearchField handleSearchInputChange={handleInputSearchChange} searchInput={eventsSearchInput} searchIputPlaceholder="Events suchen" />
					<SelectDropdown selectItem={selectDate} itemSelection={itemSelectionDate} listOfItems={dateSelectItem} />
				</div>
				<div className="flex flex-wrap justify-center md:justify-start gap-8 mt-5">
					{paginatedEvents.length > 0 ? (
						paginatedEvents.map((eventData) => <EventCard eventData={eventData} key={eventData.id} handleShowBanner={handleShowBanner} />)
					) : (
						<div className="w-full my-20 text-center">
							<p className="text-white text-lg">Keine Events wurden gefunden</p>
						</div>
					)}
				</div>
				{paginatedEvents.length > 0 && <Pagination items={filteredEvents.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />}
			</div>
			{showBanner && <ComingSoonBanner />}
		</>
	);
}

export default EventPage;
