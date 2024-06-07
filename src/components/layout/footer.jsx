import Image from "next/image";
import Link from "next/link";
const Footer = () => {
	return (
		<div className="w-full bg-transparent  text-white mt-10 px-5">
			<div className="flex flex-col items-center border-y border-slate-600 py-8 gap-y-8">
				<div className="hover:scale-95 transition duration-200">
					<Link href="/" className="hover_button_animation">
						<Image src="/logo.png" alt="Clubbery Logo Image" width={50} height={50} />
					</Link>
				</div>
				<div className="w-full flex flex-col md:flex-row text-center gap-y-8 md:justify-center md:gap-x-16">
					{/* <div className="flex flex-col items-center">
						<h2 className="font-semibold text-md mb-4">Mehr von uns</h2>
						<a className="font-light text-xs" href="/not-found">
							<p className="hover_text_animation">Unser Blog</p>
						</a>
					</div> */}
					<div className="flex flex-col items-center">
						<h2 className="font-semibold text-md mb-4">Clubbery</h2>
						<Link className="font-light text-xs mb-2" target="_blank"
							href="https://apps.apple.com/de/app/clubbery/id6476625439">
							<p className="hover_text_animation">Download</p>
						</Link>
						{/* <a className="font-light text-xs mb-2" href="/contact">
							<p className="hover_text_animation">Feedback</p>
						</a> */}
						<Link className="font-light text-xs mb-2" href="/faq">
							<p className="hover_text_animation">FAQ</p>
						</Link>
						<a className="font-light text-xs mb-2" href="/contact">
							<p className="hover_text_animation">Kontakt</p>
						</a>
					</div>
					<div className="flex flex-col items-center">
						<h2 className="font-semibold text-md mb-4">Rechtliches</h2>
						<Link className="font-light text-xs mb-2" href="/impressum">
							<p className="hover_text_animation">Impressum</p>
						</Link>
						<Link className="font-light text-xs mb-2" href="/datenschutz">
							<p className="hover_text_animation">Datenschutz</p>
						</Link>
						<Link className="font-light text-xs mb-2" href="/agb">
							<p className="hover_text_animation">AGB</p>
						</Link>
					</div>

				</div>
				<div className="hover:scale-95 transition duration-200">
					<Link href="/" className="hover_button_animation">
						<Image src="/insta-icon.png" alt="Instagram Logo Image" width={50} height={50} />
					</Link>
				</div>
			</div>
			<div className="text-center lg:text-left py-8 font-thin text-xs">
				<h3>&#9400; 2024 copyright. Alle rechte vorbehalten.</h3>
			</div>

		</div>
	);
};

export default Footer;
