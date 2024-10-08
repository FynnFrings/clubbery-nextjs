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
import EventProfile from "@/components/Event/EventProfile";

const ConfirmationEmail = loadable(() => import("@/components/Auth/ConfirmationEmail"));

const User = () => {
	const SAVED_EVENTS_DOCUMENT_NAME = process.env.NEXT_PUBLIC_USER_DATABASE_EVENTS_NAME;

	const GET_EVENT_BY_ID = process.env.NEXT_PUBLIC_GET_EVENT_BY_ID;

	const NEXT_PUBLIC_GET_ALL_TICKETS = process.env.NEXT_PUBLIC_GET_ALL_TICKETS;

	const { user, status } = useAuth();

	const dispatch = useDispatch();

	const router = useRouter();

	const provider = useSelector((state) => state.auth.provider);

	const [savedEventsUID, setSavedEventsUID] = useState([]);

	const [savedEvents, setSavedEvents] = useState([]);

	const [purchasedTickets, setPurchasedTickets] = useState([]);

	const [loadingEvents, setLoadingEvents] = useState(true);

	const [errorFetchingEvents, setErrorFetchingEvents] = useState(false);

	const [loadingTickets, setLoadingTickets] = useState(true);

	const [errorFetchingTickets, setErrorFetchingTickets] = useState(false);

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
				setLoadingEvents(false);
			}
		};

		fetchSavedEvents();
	}, [savedEventsUID, GET_EVENT_BY_ID]);

	// Fetch saved event details
	useEffect(() => {
		const fetchPuchasedTickets = async () => {
			if (user && savedEvents) {
				try {
					setLoadingTickets(true);

					setErrorFetchingTickets(false);
					//GET_ALL_TICKETS_BY_ID
					const purchasedTickets = await axios.post(NEXT_PUBLIC_GET_ALL_TICKETS, { id: user.uid });

					if (!purchasedTickets || purchasedTickets.data.length <= 0) return;

					purchasedTickets.data.forEach((ticketObjekt) => {
						const eventToTicketrelation = savedEvents.find((event) => event.id === ticketObjekt.eventId);
						if (eventToTicketrelation) {
							ticketObjekt.eventData = { ...eventToTicketrelation };
						}
					});

					setPurchasedTickets(purchasedTickets.data);
				} catch (error) {
					setErrorFetchingTickets(true);
					console.error("Error fetching purchased tickets:", error);
				} finally {
					setLoadingTickets(false);
				}
			} else {
				setLoadingTickets(false);
			}
		};

		fetchPuchasedTickets();
	}, [user, savedEvents, NEXT_PUBLIC_GET_ALL_TICKETS]);

	useEffect(() => {
		if (status === "unauthenthicated") {
			router.push("/auth/signin");
		}
	}, [router, status]);

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
					<div className="w-full max-w-4xl flex flex-col gap-8 my-8">
						{/* Favorite Events Section */}
						<h2 className="text-2xl md:text-3xl font-semibold mb-4">Gespeicherte Events</h2>
						<div className="bg-white bg-opacity-10 p-4 rounded-lg">
							{loadingEvents && <p className="text-lg">Wird aktualisiert...</p>}
							{errorFetchingEvents && <p>Ein Fehler ist aufgetreten. Versuchen Sie später nochmal.</p>}
							{!loadingEvents && !errorFetchingEvents && savedEvents.length === 0 && <p className="text-lg">Du hast noch keine Events gespeichert.</p>}
							{savedEvents.length > 0 && (
								<div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
									{savedEvents.map((event) => (
										<EventProfile key={event.itemId} event={event} />
									))}
								</div>
							)}
						</div>
						<h2 className="text-2xl md:text-3xl font-semibold mb-4">Gekaufte Tickets</h2>

						{/* Purchased Tickets Section */}
						<div className="flex flex-col gap-y-5 bg-white bg-opacity-10 p-4 rounded-lg">
							{loadingTickets && <p className="text-lg">Wird aktualisiert...</p>}
							{errorFetchingTickets && <p>Ein Fehler ist aufgetreten. Versuchen Sie später nochmal.</p>}
							{!loadingTickets && !errorFetchingTickets && purchasedTickets.length <= 0 && <p>Du hast noch keine Tickets gekauft.</p>}
							{purchasedTickets.length > 0 &&
								purchasedTickets.slice(0, 5).map((ticketObject) => {
									return <TicketProfile key={ticketObject.id} ticketId={ticketObject.id} ticketObject={ticketObject} />;
								})}
						</div>
						{purchasedTickets.length > 4 && (
							<Link href={"/tickets"} className="clubbery_main_button hover_button_animation w-full py-3 text-lg">
								Weitere {purchasedTickets.length - 5} Tickets
							</Link>
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
