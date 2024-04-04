import Image from "next/image";
import Link from "next/link";

const Landing = () => {
	return (
		<div className="flex flex-col md:flex-row md:justify-evenly md:items-center text-white mt-12 md:mt-36 w-full">
			<div className="flex flex-col gap-y-5 w-full md:w-2/3">
				<h1 className="text-3xl md:text-5xl font-bold">Dein Ticket in der Hosentasche</h1>
				<p className="text-lg">Entdecke die Welt der Events mit Clubbery: Kaufe Tickets oder präsentiere deine eigenen Events als Veranstalter. Tauche ein in eine Welt voller Möglichkeiten und erlebe unvergessliche Momente mit uns!</p>
				<Link href="/not-found" className="tracking-normal hover:tracking-[1px] transition-all duration-500 ease-in-out">
					<h3 className="text-xl text-[#CC7503]">Jetzt Erstgespräch sicher &#62;</h3>
				</Link>
				<div className="flex flex-col md:flex-row gap-5">
					<Image src="/badges/apple-badge.svg" alt="Laden in App Store" width={150} height={50} />
					<Image src="/badges/google-play-badge.png" alt="Laden in Google Play Store" width={150} height={50} />
				</div>
			</div>
			<div className="hidden md:block">
				<Image src="/iphone_mockup.png" alt="phone" width={900} height={900} />
			</div>
		</div>
	);
};

export default Landing;
