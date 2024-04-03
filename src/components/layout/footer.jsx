import Image from "next/image";
import Link from "next/link";
const Footer = () => {
	return (
		<div className="w-full bg-transparent  text-white mt-10 px-5">
			<div className="flex flex-col items-center border-y border-slate-600 py-8 gap-y-8">
				<div className="hover:scale-95 transition duration-200">
					<Link href="/">
						<Image src="/clubbery_logo.png" alt="Clubbery Logo Image" width={50} height={50} />
					</Link>
				</div>
				<div className="w-full flex flex-col lg:flex-row text-center gap-y-8 lg:justify-center lg:gap-x-16">
					<div className="flex flex-col items-center">
						<h2 className="font-semibold text-md mb-4">Mehr von uns</h2>
						<a className="font-light text-xs" href="/not-found">
							<p>Unser Blog</p>
						</a>
					</div>
					<div className="flex flex-col items-center">
						<h2 className="font-semibold text-md mb-4">Clubbery</h2>
						<Link className="font-light text-xs mb-2" href="/not-found">
							<p>Download</p>
						</Link>
						<a className="font-light text-xs mb-2" href="/contact">
							<p>Feedback</p>
						</a>
						<a className="font-light text-xs mb-2" href="/contact">
							<p>Feedback als Unternehmen</p>
						</a>
					</div>
					<div className="flex flex-col items-center">
						<h2 className="font-semibold text-md mb-4">Rechtliches</h2>
						<Link className="font-light text-xs mb-2" href="/impressum">
							<p>Impressum</p>
						</Link>
						<Link className="font-light text-xs mb-2" href="/datenschutz">
							<p>Datenschutz</p>
						</Link>
						<Link className="font-light text-xs mb-2" href="/agb">
							<p>AGB</p>
						</Link>
					</div>
				</div>
			</div>
			<div className="text-center lg:text-left py-8 font-thin text-xs">
				<h3>&#9400; 2024 copyright. Alle rechte vorbehalten.</h3>
			</div>
		</div>
	);
};

export default Footer;
