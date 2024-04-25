"use client";

function NotFoundPage() {
	return (
		<div className="w-full h-screen flex flex-col justify-center items-center gap-5">
			<p className="text-white text-3xl font-semibold">404 Fehler. Sorry Seite nicht gefunden.</p>
			<p className="text-white text-lg">Unsere Entwickler versuchen, Ihnen diese Seite so schnell wie möglich bereitzustellen.</p>
		</div>
	);
}

export default NotFoundPage;
