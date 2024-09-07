"use client";

import Layout from "@/components/layout";
import { Poppins } from "next/font/google";
import "./globals.css";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Suspense } from "react";
import { Provider } from "react-redux";
import store from "./store/store";

const poppins = Poppins({
	subsets: ["latin"],
	display: "swap",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={poppins.className}>
			<body id="body">
				<Provider store={store}>
					<Layout>
						<Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
					</Layout>
				</Provider>
			</body>
		</html>
	);
}
