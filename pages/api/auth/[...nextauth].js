import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import AppleProvider from "next-auth/providers/apple";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";

export const authOptions = {
	pages: {
		signIn: "/signin",
	},
	callbacks: {
		async signIn({ account, profile }) {
			console.log("🚀 ~ signIn ~ profile:", profile);
			if (account.provider === "google") {
				return profile.email_verified && profile.email.endsWith("@gmail.com");
			}
			return true; // Do different verification for other providers that don't have `email_verified`
		},
	},
	providers: [
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
		}),
		AppleProvider({
			clientId: process.env.APPLE_ID,
			clientSecret: process.env.APPLE_SECRET,
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {},
			async authorize(credentials) {
				return await signInWithEmailAndPassword(auth, credentials.email || "", credentials.password || "")
					.then((userCredential) => {
						if (userCredential.user) {
							return userCredential.user;
						}
						return null;
					})
					.catch((error) => console.log(error));
			},
		}),
	],
};

export default NextAuth(authOptions);
