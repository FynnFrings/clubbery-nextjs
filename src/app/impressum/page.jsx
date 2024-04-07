import Link from "next/link";
const Impressum = () => {
	return (
		<>
			{/* <Head>
          <title>Impressum | Aachen App</title>
          <link
            rel="stylesheet"
            href="https://aachen-app.de/assets/docs/php/head/"
          />
          <meta name="keywords" content="Aachen App, Impressum" />
        </Head> */}

			<main className="text-white mt-24">
				<section className="max-w-[800px]">
					<h1 className="text-3xl md:text-5xl mb-5">Impressum</h1>
				</section>

				<section className="flex flex-col gap-8 mb-4 max-w-[850px]">
					<div className="flex flex-col gap-[0.8rem]">
						<h3 className="text-2xl">ANGABEN ZUM SEITENBETREIBER</h3>
						<p className="leading-6 mt-2 text-gray-300">
							Clubbery GmbH
							<br />
							Habsburgerallee 54 52064 Aachen Deutschland
							<br />
							<br />
							Geschäftsführer Eric Eigenfeld
							<br />
							Amtsgericht Aachen HRB 26608
							<br />
							Umsatzsteuernummer DE359877109
							<br />
							<br />
							Zur Kontaktaufnahme verwenden Sie bitte unser{" "}
							<span>
								<Link href="/contact" className="text-[#CC7503] hover_text_animation">
									Kontaktformular
								</Link>
							</span>
						</p>
					</div>
				</section>
			</main>
		</>
	);
};

export default Impressum;
