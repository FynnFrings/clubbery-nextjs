"use client";

export default function GlobalError({ error, reset }) {
	useEffect(() => {
		console.error(error);
	}, [error]);
	return (
		<html>
			<body>
				<h2>Ein Fehler ist aufgetreten!</h2>
				<button onClick={() => reset()}>Nochmal versuchen</button>
			</body>
		</html>
	);
}
