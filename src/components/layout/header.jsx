"use client";
// import useMobileDetect from "@/helpers/detetctUseOS";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

const Header = () => {
	const [menu, setMenu] = useState(false);

	const handleOnClick = () => {
		setMenu(!menu);
	};
	// const device = useMobileDetect();
	return (
		<header className="sticky top-0 z-50">
			<div className="bg-[#181923] flex flex-row justify-between items-center w-full text-white py-4 px-5 md:px-10">
				<Link href="/">
					<Image src="/clubbery_logo.png" alt="Clubbery Logo Image" width={45} height={50} />
				</Link>
				<ul className="hidden md:flex flex-row justify-between items-center list-none gap-x-5 lg:gap-x-12 text-base">
					<li>
						<Link href="/not-found">So funktioniert Clubbery</Link>
					</li>
					<li>
						<Link href="/not-found">Creator werden</Link>
					</li>
					<li>
						<Link href="/not-found">FAQ</Link>
					</li>
					<li className="hover:scale-95 transition duration-200">
						<Link href="/not-found" className="px-5 py-3 rounded-2xl bg-[#CC7503] text-[#F0FDF4]">
							Download Clubbery
						</Link>
					</li>
				</ul>
				<div className="block md:hidden">
					<button type="button" onClick={() => handleOnClick()}>
						{menu ? <AiOutlineClose className="text-white w-7 h-7" /> : <RxHamburgerMenu className="text-white w-10 h-10 " />}
					</button>
				</div>
			</div>
			<div className={`absolute md:hidden ${menu ? "translate-y-0" : "-translate-y-[200%]"} bg-[#181923] w-full pb-5 transition ease-in-out shadow-lg -z-10`}>
				<ul className="flex flex-col gap-y-3 items-center list-none gap-x-12 text-base text-white">
					<li>
						<Link onClick={() => handleOnClick()} href="/not-found">
							So funktioniert Clubbery
						</Link>
					</li>
					<li>
						<Link onClick={() => handleOnClick()} href="/not-found">
							Creator werden
						</Link>
					</li>
					<li>
						<Link onClick={() => handleOnClick()} href="/not-found">
							FAQ
						</Link>
					</li>
					<li className="px-5 py-3 rounded-2xl bg-[#CC7503] text-[#F0FDF4]">
						<Link onClick={() => handleOnClick()} href="/not-found">
							Download Clubbery
						</Link>
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
