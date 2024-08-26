const convertFirebaseErrors = (errorCode) => {
	switch (errorCode) {
		case "auth/invalid-email":
			return "Ungültige E-Mail-Adresse. Bitte überprüfen Sie die Eingabe.";
		case "auth/user-disabled":
			return "Ihr Konto wurde deaktiviert. Bitte kontaktieren Sie den Support.";
		case "auth/user-not-found":
			return "Kein Benutzer mit dieser E-Mail-Adresse gefunden.";
		case "auth/wrong-password":
			return "Falsches Passwort. Bitte versuchen Sie es erneut.";
		case "auth/email-already-in-use":
			return "Diese E-Mail-Adresse wird bereits verwendet.";
		case "auth/weak-password":
			return "Das Passwort ist zu schwach. Bitte verwenden Sie ein stärkeres Passwort.";
		case "auth/operation-not-allowed":
			return "Anmeldung mit E-Mail und Passwort ist derzeit nicht möglich.";
		case "auth/too-many-requests":
			return "Zu viele Anmeldeversuche. Bitte versuchen Sie es später erneut.";
		case "auth/invalid-credential":
			return "Ungültige Anmeldeinformationen. Bitte versuchen Sie es erneut.";
		default:
			return "Ein unbekannter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
	}
};

export default convertFirebaseErrors;
