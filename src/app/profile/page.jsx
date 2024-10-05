"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { userSignOut } from "../libs/getAuth";
import { setUser } from "@/app/store/useSlice";
import { createUserInDatabase, getUserFromDatabase } from "../libs/userFirebaseActions";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorComponent from "@/components/ErrorComponent";
import Link from "next/link";
import loadable from "@loadable/component";
import TicketProfile from "@/components/Ticket/TicketProfile";

const ConfirmationEmail = loadable(() => import("@/components/Auth/ConfirmationEmail"));

const User = () => {
	const SAVED_EVENTS_DOCUMENT_NAME = process.env.NEXT_PUBLIC_USER_DATABASE_EVENTS_NAME;

	const GET_EVENT_BY_ID = process.env.NEXT_PUBLIC_GET_EVENT_BY_ID;

	const { user, status } = useAuth();

	const dispatch = useDispatch();

	const router = useRouter();

	const provider = useSelector((state) => state.auth.provider);

	const [savedEventsUID, setSavedEventsUID] = useState([]);

	const [savedEvents, setSavedEvents] = useState([]);

	const [purchasedTickets, setPurchasedTickets] = useState([]);

	const [purchasedTicketsOnly, setPurchasedTicketsOnly] = useState([]);

	const [loadingEvents, setLoadingEvents] = useState(true);

	const [errorFetchingEvents, setErrorFetchingEvents] = useState(false); // New error state

	const handleSignOut = async () => {
		try {
			dispatch(setUser(null));
			router.push("/");
			await userSignOut();
		} catch (error) {
			console.error("Error during sign out:", error);
		}
	};

	const displayUserName = user?.displayName ?? user?.email;

	// Set user info to redux
	useEffect(() => {
		const createUser = async () => {
			try {
				await createUserInDatabase(user);
			} catch (error) {
				console.error("Error creating user in Firebase:", error);
			}
		};

		if (user) {
			const currentUser = {
				displayName: user.displayName,
				email: user.email,
				emailVerified: user.emailVerified,
				uid: user.uid,
			};

			dispatch(setUser(currentUser));

			createUser();
		}
	}, [user, dispatch]);

	// Fetch saved event IDs
	useEffect(() => {
		const fetchSavedEventUIDs = async () => {
			if (user) {
				try {
					const userFromFirebase = await getUserFromDatabase(user.uid);

					if (userFromFirebase?.[SAVED_EVENTS_DOCUMENT_NAME]?.length > 0) {
						setSavedEventsUID(userFromFirebase[SAVED_EVENTS_DOCUMENT_NAME]);
					}
				} catch (error) {
					console.error("Error fetching saved events from Firebase:", error);
				}
			}
		};

		if (user) {
			fetchSavedEventUIDs();
		}
	}, [user, SAVED_EVENTS_DOCUMENT_NAME]);

	// Fetch saved event details
	useEffect(() => {
		const fetchSavedEvents = async () => {
			if (savedEventsUID.length > 0) {
				try {
					setLoadingEvents(true);

					setErrorFetchingEvents(false);

					const eventRequests = savedEventsUID.map((eventUID) => axios.post(`${GET_EVENT_BY_ID}`, { id: eventUID }));

					const events = await Promise.all(eventRequests);

					setSavedEvents(events.filter((res) => res.data).map((res) => res.data));
				} catch (error) {
					console.error("Error fetching saved events:", error);
					setErrorFetchingEvents(true);
				} finally {
					setLoadingEvents(false);
				}
			} else {
				setSavedEvents([]);
				setLoadingEvents(false);
			}
		};

		fetchSavedEvents();
	}, [savedEventsUID, GET_EVENT_BY_ID]);

	// Fetch saved event details
	useEffect(() => {
		const fetchPuchasedTickets = async () => {
			if (user && savedEvents) {
				console.log("🚀 ~ fetchSavedEvents ~ user:", user.uid);
				try {
					//GET_ALL_TICKETS_BY_ID
					const purchasedTickets = await axios.post(`https://getpurchasesbyuserid-qh42lmu4jq-uc.a.run.app`, { id: user.uid });

					if (!purchasedTickets || purchasedTickets.data.length <= 0) return;

					console.log("🚀 ~ purchasedTickets.data.forEach ~ savedEvents:", savedEvents);
					purchasedTickets.data.forEach((ticketObjekt) => {
						const eventToTicketrelation = savedEvents.find((event) => event.id === ticketObjekt.eventId);
						if (eventToTicketrelation) {
							ticketObjekt.eventData = { ...eventToTicketrelation };
						}
					});

					console.log("🚀 ~ fetchPuchasedTickets ~ purchasedTickets:", purchasedTickets.data);

					setPurchasedTickets(purchasedTickets.data);

					const onlyTicketItems = purchasedTickets.data.map((ticketObjekt) => ticketObjekt.items).flat();

					if (!onlyTicketItems || onlyTicketItems.length <= 0) return;
					console.log("🚀 ~ fetchPuchasedTickets ~ onlyTicketItems:", onlyTicketItems);
					setPurchasedTicketsOnly(onlyTicketItems);
				} catch (error) {
					console.error("Error fetching purchased tickets:", error);
				}
			}
		};

		fetchPuchasedTickets();
	}, [user, savedEvents]);

	useEffect(() => {
		if (!user && status === "unauthenthicated") {
			router.push("/auth/signin");
		}
	}, [user, router, status]);

	if (status === "loading") return <LoadingSpinner />;
	if (status === "authenticated" && user && !user.emailVerified) return <ConfirmationEmail />;
	if (status === "unauthenticated") return <ErrorComponent />;

	return (
		<>
			<div className="w-full min-h-screen flex flex-col items-center gap-8 p-6 md:p-12 text-white">
				<div className="w-full max-w-4xl text-center">
					<h1 className="text-2xl md:text-4xl font-semibold">Herzlich Willkommen, {displayUserName}!</h1>
					<p className="text-lg md:text-xl mt-4">Hier kannst du deine gespeicherten Events und gekauften Tickets ansehen.</p>
				</div>

				<div className="w-full max-w-4xl flex flex-col gap-6">
					<div className="w-full max-w-4xl flex flex-col gap-8 mt-8">
						{/* Favorite Events Section */}
						<div>
							<h2 className="text-2xl md:text-3xl font-semibold mb-4">Gespeicherte Events</h2>
							<div className="bg-white bg-opacity-10 p-4 rounded-lg">
								{loadingEvents && <p className="text-lg">Wird aktualisiert...</p>}
								{errorFetchingEvents && <p>Ein Fehler ist aufgetreten. Versuchen Sie später nochmal.</p>}
								{!loadingEvents && !errorFetchingEvents && savedEvents.length === 0 && <p className="text-lg">Du hast noch keine Events gespeichert.</p>}
								{savedEvents.length > 0 && (
									<ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
										{savedEvents.map((event) => (
											<li key={event.itemId}>
												<Link href={`/events/${event.itemId}`}>
													<div style={{ backgroundImage: `url(${event.images[0].url}})` }} className="p-4 h-48 rounded-lg flex justify-center items-center bg-cover bg-center bg-blend-darken bg-[#0000004f] transition-transform duration-200 hover:scale-95">
														<h3 className="text-lg font-semibold mb-2">{event.details.title}</h3>
													</div>
												</Link>
											</li>
										))}
									</ul>
								)}
							</div>
						</div>
						<h2 className="text-2xl md:text-3xl font-semibold mb-4">Gekaufte Tickets</h2>

						{/* Purchased Tickets Section */}
						{purchasedTicketsOnly && purchasedTicketsOnly.length > 0 && (
							<ul className="flex flex-col gap-y-5 bg-white bg-opacity-10 p-4 rounded-lg">
								{/* {purchasedTicketsOnly.map((ticket) => (
									// <TicketProfile key={ticket.id} />
								))} */}
							</ul>
						)}
					</div>

					<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
						{provider === "credentials" && (
							<Link href="/profile/change-password" className="clubbery_main_button hover_button_animation w-full py-3 text-lg">
								Passwort zurücksetzen
							</Link>
						)}

						{provider === "credentials" && (
							<Link href="/profile/change-email" className="clubbery_main_button hover_button_animation w-full py-3 text-lg">
								E-mail ändern
							</Link>
						)}

						<Link href="/profile/change-name" className="clubbery_main_button hover_button_animation w-full py-3 text-lg">
							Benutzername ändern
						</Link>

						<Link href="/profile/delete-account" className="clubbery_main_button hover_button_animation w-full py-3 text-lg">
							Konto entfernen
						</Link>
					</div>

					<div className="w-full flex justify-center">
						<button className="clubbery_main_button hover_button_animation w-full md:w-1/2 py-3 text-lg mt-5" onClick={handleSignOut}>
							Abmelden
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default User;
