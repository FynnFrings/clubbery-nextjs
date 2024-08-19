// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCE7APuoKrs24idf23aX1Dj5lcx9oMGGZg",
	authDomain: "clubbery-dev.firebaseapp.com",
	projectId: "clubbery-dev",
	storageBucket: "clubbery-dev.appspot.com",
	messagingSenderId: "401395826376",
	appId: "1:401395826376:web:54e8e9050fe2b3e4f86ffd",
	measurementId: "G-R49PZVPWSK",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, app, db };
