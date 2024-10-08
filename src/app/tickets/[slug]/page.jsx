"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import Barcode from "react-barcode";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper React components
import { Navigation } from "swiper/modules";
import useSWR from "swr";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorComponent from "@/components/ErrorComponent";
import convertUnixDateToFullDate from "@/helpers/convertUnixDateFullDate";
import { useWindowSize } from "@/app/hooks/useWindowSize";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const Ticket = ({ params }) => {
	const { user, status } = useAuth();
	const router = useRouter();
	const searchParams = useSearchParams();
	const eventId = searchParams.get("eventId");

	const windowSize = useWindowSize();

	const GET_TICKET_BY_ID = process.env.NEXT_PUBLIC_GET_TICKET_BY_ID;
	const GET_EVENT_BY_ID = process.env.NEXT_PUBLIC_GET_EVENT_BY_ID;

	// Ticket fetcher with error handling
	const ticketFetcher = async (...args) => {
		try {
			const response = await fetch(...args, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: params.slug }),
			});
			if (!response.ok) throw new Error("Failed to fetch ticket data");
			return response.json();
		} catch (error) {
			throw new Error(error.message);
		}
	};

	// Event fetcher with error handling
	const eventFetcher = async (...args) => {
		try {
			const response = await fetch(...args, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: eventId }),
			});

			if (!response.ok) throw new Error("Failed to fetch event data");

			return response.json();
		} catch (error) {
			throw new Error(error.message);
		}
	};

	const { data: ticketData, isLoading: isTicketLoading, error: fetchingTicketError } = useSWR(GET_TICKET_BY_ID, ticketFetcher);

	const { data: eventData, isLoading: isEventLoading, error: fetchingEventError } = useSWR(GET_EVENT_BY_ID, eventFetcher);

	const convertedDate = convertUnixDateToFullDate(eventData?.timeFrame);

	// Redirect unauthenticated users
	useEffect(() => {
		if (!user && status === "unauthenticated") {
			router.push("/auth/signin");
		}
	}, [status, router, user]);

	// Show loading spinner while data is being fetched
	if (isTicketLoading || isEventLoading) return <LoadingSpinner />;

	// Show error component if fetching fails
	if (fetchingTicketError || fetchingEventError) {
		console.error("Error fetching data:", fetchingTicketError || fetchingEventError);
		return <ErrorComponent message={fetchingTicketError?.message || fetchingEventError?.message} />;
	}

	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="w-full flex justify-center">
				<Swiper modules={[Navigation]} navigation={windowSize.width && windowSize.width > 768} spaceBetween={100} slidesPerView={1} className="w-full md:w-1/2 lg:w-1/3">
					{ticketData?.items?.map((item, index) =>
						item?.codes?.map((code, codeIndex) => (
							<SwiperSlide key={`${item.id}_${codeIndex}`}>
								{/* Ticket Slide - Contains full ticket details */}
								<div className="bg-[#262730] rounded-lg shadow-lg py-6 px-6 md:px-16 text-white">
									<div className="flex flex-col gap-y-6">
										{/* Event Title */}
										<div className="text-center mb-4">
											<h2 className="text-xl font-semibold">{eventData?.details?.title ?? "Unbekanntes Event"}</h2>
										</div>

										{/* Event Image */}
										<div className="w-full h-48 mb-4 relative">
											<Image
												src={eventData?.images?.[0]?.url ?? "/party.webp"} // Replace with dynamic image
												alt={eventData?.details?.title ?? "Unbekanntes Event"}
												layout="fill"
												objectFit="cover"
												className="rounded-lg"
											/>
										</div>

										{/* Ticket Details */}
										<div className="mb-6 flex flex-col gap-y-3">
											<div className="flex justify-between text-sm">
												<p className="font-semibold">Name</p>
												<p>{user?.displayName ?? ""}</p>
											</div>
											<div className="flex justify-between text-sm">
												<p className="font-semibold">Anzahl</p>
												<p>1</p>
											</div>
											<div className="flex justify-between text-sm">
												<p className="font-semibold">Datum</p>
												<p>{convertedDate?.openDate || "Unbekanntes Datum"}</p>
											</div>
											<div className="flex justify-between text-sm">
												<p className="font-semibold">Uhrzeit</p>
												<p>{convertedDate?.openTime || "Unbekannt"}</p>
											</div>
											<div className="flex justify-between text-sm">
												<p className="font-semibold">Preis</p>
												<p>{(item?.totalPrice / 100).toFixed(2)} €</p>
											</div>
										</div>

										{/* Barcode Section */}
										<div className="flex flex-col items-center justify-center w-full">
											<Barcode className="rounded-lg w-full h-auto" value={code} />
										</div>
									</div>
								</div>
							</SwiperSlide>
						))
					)}
				</Swiper>
			</div>
		</div>
	);
};

export default Ticket;
