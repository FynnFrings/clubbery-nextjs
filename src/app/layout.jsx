import Layout from "@/components/layout";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
	subsets: ["latin"],
	display: "swap",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={poppins.className}>
			<body>
				<Layout>{children}</Layout>
			</body>
		</html>
	);
}
