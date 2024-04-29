import Image from "next/image";
import Link from "next/link";

const Landing = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-evenly md:items-center text-white  w-full">
      <div className="flex flex-col gap-y-5 w-full md:w-2/3">
        <h1 className="text-3xl md:text-5xl font-bold">
          Dein Ticket in der Hosentasche
        </h1>
        <p className="text-lg">
          Entdecke die Welt der Partys mit Clubbery: Kaufe Tickets oder
          präsentiere deine eigenen Partys als Veranstalter. Tauche ein in eine
          Welt voller Möglichkeiten und erlebe unvergessliche Momente mit uns!
        </p>
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
          <Image
            src="/badges/google_play_store_black_and_white.png"
            alt="Laden in Google Play Store"
            width={150}
            height={50}
          />
        </div>
      </div>
      <div className="hidden md:block relative">
        <div className="-z-10 absolute top-6 left-36 lg:top-6 lg:left-36 xl:top-6 xl:left-48 w-24 h-24 lg:w-36 lg:h-36 bg-violet-500 rounded-full blur-3xl"></div>
        <div className="-z-10 absolute top-24 right-8 lg:top-36 lg:right-6 xl:top-44 xl:right-8 w-24 h-24 lg:w-36 lg:h-36 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="-z-10 absolute bottom-24 left-24 lg:bottom-44 lg:left-32 xl:bottom-48 xl:left-32 w-24 h-24 lg:w-36 lg:h-36 bg-yellow-500 rounded-full blur-3xl"></div>
        <div className="-z-10 absolute -bottom-5 right-14 lg:-bottom-5 lg:right-28 xl:-bottom-5 xl:right-32 w-24 h-24 lg:w-36 lg:h-36 bg-sky-500 rounded-full blur-3xl"></div>
        <Image
          className="z-10"
          src="/iphonemockupsclubbery.png"
          alt="phone"
          width={1200}
          height={1500}
        />
      </div>
    </div>
  );
};

export default Landing;
