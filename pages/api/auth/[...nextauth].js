import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import AppleProvider from "next-auth/providers/apple";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";

export const authOptions = {
	pages: {
		signIn: "/auth/signin",
	},
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			return true; // Do different verification for other providers that don't have `email_verified`
		},

		async jwt({ token, account, profile }) {
			// console.log("🚀 ~ jwt ~ profile:", profile);
			// console.log("🚀 ~ jwt ~ account:", account);
			// console.log("🚀 ~ jwt ~ token:", token);
			// Persist the OAuth access_token and or the user id to the token right after signin

			return token;
		},

		async session({ session, token, user }) {
			// console.log("🚀 ~ session ~ user:", user);
			// console.log("🚀 ~ session ~ token:", token);
			// console.log("🚀 ~ session ~ session:", session);

			return session;
		},
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET,
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
