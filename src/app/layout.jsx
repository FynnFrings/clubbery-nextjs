import Layout from "@/components/layout";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SessionProvider from "./SessionProvider";

const poppins = Poppins({
	subsets: ["latin"],
	display: "swap",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={poppins.className}>
			<body id="body">
				{/* <Script src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"  /> */}
				<SessionProvider>
					<Layout>{children}</Layout>
				</SessionProvider>
			</body>
		</html>
	);
}
