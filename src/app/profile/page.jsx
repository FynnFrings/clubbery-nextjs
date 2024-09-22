"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { userSignOut } from "../libs/getAuth";
import { setUser } from "@/app/store/useSlice";
import { getUserFromDatabase } from "../libs/userFirebaseActions";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorComponent from "@/components/ErrorComponent";
import Link from "next/link";
import loadable from "@loadable/component";

const ConfirmationEmail = loadable(() => import("@/components/Auth/ConfirmationEmail"));
const ChangePasswordModal = loadable(() => import("@/components/Auth/ChangePasswordModal"));
const ChangeEmailModal = loadable(() => import("@/components/Auth/ChangeEmailModal"));
const AccountDeletionModal = loadable(() => import("@/components/Auth/DeleteUserAccountModal"));
const ChangeUserDisplayNameModal = loadable(() => import("@/components/Auth/ChangeUserDisplayNameModal"));

const User = () => {
	const SAVED_EVENTS_DOCUMENT_NAME = process.env.NEXT_PUBLIC_USER_DATABASE_EVENTS_NAME;

	const GET_EVENT_BY_ID = process.env.NEXT_PUBLIC_GET_EVENT_BY_ID;

	const { user, status } = useAuth();

	const dispatch = useDispatch();

	const router = useRouter();

	const provider = useSelector((state) => state.auth.provider);

	const [savedEventsUID, setSavedEventsUID] = useState([]);
	const [savedEvents, setSavedEvents] = useState([]);

	const [loadingEvents, setLoadingEvents] = useState(true);

	const [errorFetchingEvents, setErrorFetchingEvents] = useState(false); // New error state

	// Modal state
	const [modalState, setModalState] = useState({
		showChangePasswordModal: false,
		showChangeEmailModal: false,
		showChangeNameModal: false,
		showAccountDeletionModal: false,
	});

	// Helper functions to toggle modals
	const toggleModal = useCallback((modalName, isVisible) => {
		setModalState((prevState) => ({
			...prevState,
			[modalName]: isVisible,
		}));
	}, []);

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
		if (user) {
			const currentUser = {
				displayName: user.displayName,
				email: user.email,
				emailVerified: user.emailVerified,
				uid: user.uid,
			};
			dispatch(setUser(currentUser));
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

					setSavedEvents(events.map((res) => res.data));
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
												<Link href={`/events/${event.itemId}`} className="">
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

						{/* Purchased Tickets Section */}
						<div>
							<h2 className="text-2xl md:text-3xl font-semibold mb-4">Gekaufte Tickets</h2>
							<div className="bg-white bg-opacity-10 p-4 rounded-lg">
								{/* Replace with dynamic content */}
								<p className="text-lg">Du hast noch keine Tickets gekauft.</p>
							</div>
						</div>
					</div>

					<div className="w-full flex flex-col md:flex-row gap-5">
						{provider === "credentials" && (
							<button className="clubbery_main_button hover_button_animation w-full py-3 text-lg" onClick={() => toggleModal("showChangePasswordModal", true)}>
								Passwort zurücksetzen
							</button>
						)}

						{provider === "credentials" && (
							<button className="clubbery_main_button hover_button_animation w-full py-3 text-lg" onClick={() => toggleModal("showChangeEmailModal", true)}>
								E-mail ändern
							</button>
						)}

						<button className="clubbery_main_button hover_button_animation w-full py-3 text-lg" onClick={() => toggleModal("showChangeNameModal", true)}>
							Benutzername ändern
						</button>

						<button className="clubbery_main_button hover_button_animation w-full py-3 text-lg" onClick={() => toggleModal("showAccountDeletionModal", true)}>
							Konto entfernen
						</button>
					</div>

					<div className="w-full flex justify-center">
						<button className="clubbery_main_button hover_button_animation w-full md:w-1/2 py-3 text-lg mt-5" onClick={handleSignOut}>
							Abmelden
						</button>
					</div>
				</div>
			</div>

			{modalState.showChangePasswordModal && <ChangePasswordModal onClose={() => toggleModal("showChangePasswordModal", false)} />}
			{modalState.showChangeEmailModal && <ChangeEmailModal onClose={() => toggleModal("showChangeEmailModal", false)} />}
			{modalState.showChangeNameModal && <ChangeUserDisplayNameModal onClose={() => toggleModal("showChangeNameModal", false)} />}
			{modalState.showAccountDeletionModal && <AccountDeletionModal onClose={() => toggleModal("showAccountDeletionModal", false)} />}
		</>
	);
};

export default User;
