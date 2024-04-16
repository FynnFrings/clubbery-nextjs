const FAQ = () => {
	return (
		<>
			<div className="text-white">
				<h1 className="text-2xl md:text-5xl mb-5">FAQ</h1>
				<div className="flex flex-col gap-y-5 mb-10">
					<details>
						<summary className="text-lg md:text-2xl hover_text_animation w-fit list-none cursor-pointer">Kostet die Nutzung der Clubbery App etwas?</summary>
						<p className="mt-5 text-base md:text-lg">
							Der Download und die Nutzung der Clubbery App sind kostenfrei. Es entstehen einzig Gebühren beim Veranstalter, wenn dieser Tickets über die App/Plattform verkauft (3% Clubbery Gebühren zzgl. USt. + Gebühren des Zahlungsabwicklers).{" "}
						</p>
					</details>
					<details>
						<summary className="text-lg md:text-2xl hover_text_animation w-fit list-none cursor-pointer">Was mache ich, wenn ich mein Passwort vergessen habe?</summary>
						<p className="mt-5 text-base md:text-lg">
							Öffne die App und gehe unten rechts auf „Profil“, klick auf „Anmelden“ und wähle danach „Passwort vergessen“. Gib in diesem Fenster deine Mailadresse ein, mit welcher du deinen Clubbery Account erstellt hast und klicke danach unten auf weiter. Schau nun in dein Postfach
							und klicke auf den Link in der Mail, welche du von „noreply@clubbery.com“ erhalten hast. Auf der sich öffnenden Seite kannst du nun ein neues Passwort für deinen Clubbery Account eingeben.{" "}
						</p>
					</details>
					<details>
						<summary className="text-lg md:text-2xl hover_text_animation w-fit list-none cursor-pointer">Wie werde ich Veranstalter?</summary>
						<p className="mt-5 text-base md:text-lg">
							Erstelle einen Clubbery Account über die App und gehe unten rechts auf „Profil“, klick unten auf „Clubbery Creator werden“ und wähle in dem Popup „Jetzt Anfragen“. Unser Support wird sich daraufhin mit dir in Verbindung setzen, um dir alle nötigen Informationen zur
							Verfügung zu stellen.
						</p>
					</details>
					<details>
						<summary className="text-lg md:text-2xl hover_text_animation w-fit list-none cursor-pointer">Auf welchen Geräten kann ich die Clubbery App installieren?</summary>
						<p className="mt-5 text-base md:text-lg">Auf allen iPhones mit der neusten iOS-Version. Android Phones werden mit den folgenden Updates ebenso freigeschaltet und die Webversion über einen beliebigen Webbrowser wird in einigen Monaten folgen. </p>
					</details>
					<details>
						<summary className="text-lg md:text-2xl hover_text_animation w-fit list-none cursor-pointer">Was passiert, wenn ein Event ausfällt?</summary>
						<p className="mt-5 text-base md:text-lg">In diesem Fall bekommst du automatisch deinen gesamten Kaufbetrag der Tickets zu diesem Event erstattet. </p>
					</details>
					<details>
						<summary className="text-lg md:text-2xl hover_text_animation w-fit list-none cursor-pointer">Kann ich auch ohne Internet auf meine Tickets zugreifen?</summary>
						<p className="mt-5 text-base md:text-lg">
							Ja, du kannst auch ohne Internet auf deine Tickets in der installierten Clubbery App zugreifen. Dennoch empfehlen wir dir die Tickets vor dem Betreten der Event-Location kurz mit einer bestehenden Internetverbindung zu öffnen, sodass beim Scannen bzw. Vorzeigen auch alle
							Informationen angezeigt werden können.{" "}
						</p>
					</details>
					<details>
						<summary className="text-lg md:text-2xl hover_text_animation w-fit list-none cursor-pointer">In welchen Ländern kann ich Events über die Clubbery App finden?</summary>
						<p className="mt-5 text-base md:text-lg">
							Aktuell sind wir einzig in Deutschland vertreten und wachsen von unserer Heimatstadt Aachen ausgehend über ganz Deutschland. Aber keine Sorge, selbstverständlich ist es unser Ziel weltweit die angesagtesten Events und Partys für dich in die Clubbery App zu holen. Falls du
							eine Diskothek besitzt oder in einer arbeitest, dann nutze gerne unser Kontaktformular, um mit uns Kontakt aufzunehmen, wir freuen uns von dir zu hören!{" "}
						</p>
					</details>
					<details>
						<summary className="text-lg md:text-2xl hover_text_animation w-fit list-none cursor-pointer">Hilft euch mein Feedback weiter?</summary>
						<p className="mt-5 text-base md:text-lg">
							Selbstverständlich helfen uns dein Feedback, deine Verbesserungsvorschläge und Ideen zu Erweiterungen bzw. neuen Funktionen weiter! Und da wir wissen, wie wertvoll deine Zeit ist, bekommen die besten drei Nachrichten jeden Monat ein großartiges Geschenkpaket von uns.
							Nutze zur Teilnahme gerne unser Kontaktformular.{" "}
						</p>
					</details>
					<details>
						<summary className="text-lg md:text-2xl hover_text_animation w-fit list-none cursor-pointer">Wann bekomme ich meine Ticket-Einnahmen überwiesen?</summary>
						<p className="mt-5 text-base md:text-lg">(Müssen wir zusammen abklären und entsprechend im Stripe einstellen)</p>
					</details>
					<details>
						<summary className="text-lg md:text-2xl hover_text_animation w-fit list-none cursor-pointer">Welche Bezahlmethoden werden akzeptiert? </summary>
						<p className="mt-5 text-base md:text-lg">(Müssen wir zusammen abklären und entsprechend im Stripe einstellen)</p>
					</details>
				</div>
				<p className="text-base md:text-lg">Nicht die richtige Lösung für dein Problem bzw. dein Anliegen gefunden? Dann nutze gerne unser Kontaktformular (Link) oder schreibe uns eine Mail an support@clubbery.com, um mit uns Kontakt aufzunehmen.</p>
			</div>
		</>
	);
};

export default FAQ;
