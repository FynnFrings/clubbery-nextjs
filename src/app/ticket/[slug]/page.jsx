"use client";

import Image from "next/image";
import { useEffect, useState, useCallback, useMemo } from "react";
import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import Barcode from "react-barcode";

const Ticket = () => {
	const { user, status } = useAuth();

	const router = useRouter();

	// Redirect unauthenticated users
	useEffect(() => {
		if (!user && status === "unauthenticated") {
			router.push("/auth/signin");
		}
	}, [status, router, user]);
	return (
		<div className="flex justify-center items-center min-h-screen ">
			<div className="bg-[#262730] rounded-lg shadow-lg p-6 w-[360px] text-white">
				{/* Event Title */}
				<div className="text-center mb-4">
					<h2 className="text-xl font-semibold">Pablo&apos;s Party</h2>
				</div>

				{/* Event Image */}
				<div className="w-full h-48 mb-4 relative">
					<Image
						src="/party.webp" // replace with your image path
						alt="Event Image"
						layout="fill"
						objectFit="cover"
						className="rounded-lg"
					/>
				</div>

				{/* VIP Area Section */}
				<div className="text-left mb-4">
					<h3 className="text-lg font-semibold">VIP Area</h3>
					<p className="text-sm text-gray-300">Eintritt zur Party ab 22 Uhr</p>
					<p className="text-sm text-gray-300">Eigene VIP Area für den Zeitraum der Party</p>
				</div>

				{/* Ticket Details */}
				<div className="mb-6 flex flex-col gap-y-5">
					<div className="flex justify-between text-sm">
						<p className="font-semibold">Name</p>
						<p>Fynn Frings</p>
					</div>
					<div className="flex justify-between text-sm">
						<p className="font-semibold">Anzahl</p>
						<p>1</p>
					</div>
					<div className="flex justify-between text-sm">
						<p className="font-semibold">Datum</p>
						<p>5. Oktober 2024</p>
					</div>
					<div className="flex justify-between text-sm">
						<p className="font-semibold">Uhrzeit</p>
						<p>22:00 Uhr</p>
					</div>
				</div>

				{/* Barcode */}
				<div className="text-center mt-4">
					<Barcode className="rounded-lg" value="12332137126317823" />
					<p className="text-xs text-gray-400">Please scan the barcode at the entry gate</p>
				</div>
			</div>
		</div>
	);
};

export default Ticket;
