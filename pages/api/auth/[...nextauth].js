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
		async signIn({ user, account, profile }) {
			if (account.provider === "google") {
				user.accessToken = account.access_token;
			}
			return true;
		},
		async session({ session, token, user }) {
			session.user.accessToken = token.accessToken;
			return session;
		},
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
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
