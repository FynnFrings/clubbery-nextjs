"use client";

import Image from "next/image";
import Link from "next/link";

function EventPage() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-5">
            <p className="text-white text-3xl font-semibold">Installiere unsere Clubbery App, um dieses und viele weitere Events sehen zu können!</p>
            <div className="flex flex-col md:flex-row gap-5">
                <Link
                    target="_blank"
                    href="https://apps.apple.com/de/app/clubbery/id6476625439"
                >
                    <Image
                        src="/badges/apple-badge.png"
                        alt="Laden in App Store"
                        width={150}
                        height={50}
                    />{" "}
                </Link>
                <Link
                    target="_blank"
                    href="https://play.google.com/store/apps/details?id=net.swibble.clubberyApp"
                >
                    <Image
                        src="/badges/google-play-badge.png"
                        alt="Laden in Google Play Store"
                        width={150}
                        height={50}
                    />
                </Link>
            </div>
        </div>
    );
}

export default EventPage;
