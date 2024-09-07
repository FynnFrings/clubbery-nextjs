"use client";

import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { userSignOut } from "../libs/getAuth";
import { useRouter } from "next/navigation";
import loadable from "@loadable/component";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorComponent from "@/components/ErrorComponent";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/app/store/useSlice";
import { getUserFromDatabase } from "../libs/userFirebaseActions";
import Link from "next/link";

const User = () => {
	const savedEventsDocumentName = process.env.NEXT_PUBLIC_USER_DATABASE_EVENTS_NAME;

	const GET_EVENT_BY_ID = process.env.NEXT_PUBLIC_GET_EVENT_BY_ID;

	const router = useRouter();

	const dispatch = useDispatch();

	const { user, status } = useAuth();

	const provider = useSelector((state) => state.auth.provider);

	const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

	const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);

	const [showChangeNameModal, setShowChangeNameModal] = useState(false);

	const [savedEventsUID, setSavedEventsUID] = useState([]);
	const [savedEvents, setSavedEvents] = useState([]);
	const [loadingEvents, setLoadingEvents] = useState(true);

	const displayUserName = user?.displayName ?? user?.email;

	const handleSignOut = async () => {
		try {
			dispatch(setUser(null));
			router.push("/");
			await userSignOut();
		} catch (error) {
			console.log(error);
		}
	};
	const [showAccountDeletionModal, setShowAccountDeletionModal] = useState(false);

	const handleShowAccountDeletionModal = () => {
		setShowAccountDeletionModal(true);
	};

	const handleCloseAccountDeletionModal = () => {
		setShowAccountDeletionModal(false);
	};

	const handleShowChangePasswordBanner = () => {
		setShowChangePasswordModal(true);
	};

	const handleCloseModal = () => {
		setShowChangePasswordModal(false);
	};

	const handleShowEmailModal = () => {
		setShowChangeEmailModal(true);
	};

	const handleCloseEmailModal = () => {
		setShowChangeEmailModal(false);
	};

	const handleOpenModalChangeDisplayName = () => {
		setShowChangeNameModal(true);
	};

	const handleCloseModalChangeDisplayName = () => {
		setShowChangeNameModal(false);
	};

	useEffect(() => {
		if (user) {
			const currnetUser = {
				displayName: user.displayName,
				email: user.email,
				emailVerified: user.emailVerified,
				uid: user.uid,
			};
			dispatch(setUser(currnetUser));
		}
	}, [user]);

	// Fetch saved events
	useEffect(() => {
		const checkIfEventIsSaved = async () => {
			if (user) {
				const userFromFirebase = await getUserFromDatabase(user.uid);

				if (userFromFirebase && userFromFirebase[savedEventsDocumentName] && userFromFirebase[savedEventsDocumentName].length > 0) {
					setSavedEventsUID(userFromFirebase[savedEventsDocumentName]);
				}
			}
		};
		if (user) {
			checkIfEventIsSaved();
		}
	}, [user, savedEventsDocumentName]);

	// Fetch event details for saved events
	useEffect(() => {
		const fetchSavedEvents = async () => {
			if (savedEventsUID.length > 0) {
				try {
					setLoadingEvents(true);
					const eventRequests = savedEventsUID.map((eventUID) => axios.post(`${GET_EVENT_BY_ID}`, { id: `${eventUID}` }));
					const events = await Promise.all(eventRequests);
					setSavedEvents(events.map((response) => response.data));
				} catch (error) {
					console.error("Error fetching saved events:", error);
				} finally {
					setLoadingEvents(false);
				}
			} else {
				setLoadingEvents(false);
			}
		};

		if (savedEventsUID.length > 0) {
			fetchSavedEvents();
		} else {
			setSavedEvents([]);
		}
	}, [savedEventsUID, GET_EVENT_BY_ID]);

	const ConfirmationEmail = loadable(() => import("@/components/Auth/ConfirmationEmail"));
	const ChangePasswordModal = loadable(() => import("@/components/Auth/ChangePasswordModal"));
	const ChangeEmailModal = loadable(() => import("@/components/Auth/ChangeEmailModal"));
	const AccountDeletionModal = loadable(() => import("@/components/Auth/DeleteUserAccountModal"));
	const ChangeUserDisplayNameModal = loadable(() => import("@/components/Auth/ChangeUserDisplayNameModal"));

	if (status === "loading") return <LoadingSpinner />;
	if (status === "authenthicated" && user && !user.emailVerified) return <ConfirmationEmail />;
	if (status === "unauthenthicated") return <ErrorComponent />;

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
								{loadingEvents ? (
									<p className="text-lg">Aktualisieren...</p>
								) : savedEvents.length > 0 ? (
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
								) : (
									<p className="text-lg">Du hast noch keine Events gespeichert.</p>
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
						{provider && (
							<button className="clubbery_main_button hover_button_animation w-full py-3 text-lg" onClick={handleShowChangePasswordBanner}>
								Passwort zurücksetzen
							</button>
						)}

						{provider && (
							<button className="clubbery_main_button hover_button_animation w-full py-3 text-lg" onClick={handleShowEmailModal}>
								E-mail ändern
							</button>
						)}

						<button className="clubbery_main_button hover_button_animation w-full py-3 text-lg" onClick={handleOpenModalChangeDisplayName}>
							Benutzername ändern
						</button>

						<button className="clubbery_main_button hover_button_animation w-full py-3 text-lg" onClick={handleShowAccountDeletionModal}>
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

			{showChangePasswordModal && <ChangePasswordModal onClose={handleCloseModal} user={user} />}
			{showChangeEmailModal && <ChangeEmailModal onClose={handleCloseEmailModal} />}
			{showAccountDeletionModal && <AccountDeletionModal onClose={handleCloseAccountDeletionModal} />}
			{showChangeNameModal && <ChangeUserDisplayNameModal user={user} onClose={handleCloseModalChangeDisplayName} />}
		</>
	);
};

export default User;
