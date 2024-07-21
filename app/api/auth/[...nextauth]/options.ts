import type { NextAuthOptions, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedinProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import { createUserUtil, readUserUtil } from "@/utils/authenticate";

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        LinkedinProvider({
            clientId: process.env.LINKEDIN_ID as string,
            clientSecret: process.env.LINKEDIN_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                userName: {
                    label: "Username",
                    type: "text",
                    placeholder: "Enter your username",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter your password"
                }
            },
            async authorize(credentials) {
                const user = {
                    id: '42',
                    name: 'TestUser',
                    password: 'password'
                }

                if (credentials?.userName === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    theme: {
        logo: "/vercel.svg",
        colorScheme: "dark",
        brandColor: "#FFFFFF",
        buttonText: "#00000"
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            return url
        },
        async signIn({ user, account, profile }) {
            const readUserRes = await readUserUtil(user);

            if (!readUserRes.user) {

                const createUserRes = await createUserUtil(user);

                if (!createUserRes.user) {
                    return false
                }
                user.role = createUserRes.user.role!;
            } else {
                user.role = readUserRes.user.role!;
            }

            // user.accessToken = account?.access_token

            return true;
        },
        async jwt({ token, user, session }) {
            // console.log("JWTToken_2:", token.accessToken);

            if (user && user.role) {
                token.role = user.role;
            }

            return token;
        },
        session: async ({ session, user, token }) => {
            // session.accessToken = token.accessToken;

            if (token.role) {
                session.user.role = token.role;
            }

            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    debug: true,
}