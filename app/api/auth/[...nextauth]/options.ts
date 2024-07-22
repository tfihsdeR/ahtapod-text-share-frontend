import type { NextAuthOptions, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { createUserUtil, readUserUtil } from "@/utils/authenticate";
import { IUser } from "@/types/types";

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
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string, password: string };

                const newUser: IUser = {
                    email,
                    password,
                }

                const readUserRes = await readUserUtil({ email });

                if (!readUserRes.user) {
                    const createUserRes = await createUserUtil(newUser);

                    if (!createUserRes.user) {
                        return null;
                    }

                    return {
                        email: createUserRes.user.email,
                        role: createUserRes.user.role!,
                        name: createUserRes.user.name,
                        id: createUserRes.user.id!
                    };
                }

                return {
                    email: readUserRes.user.email,
                    role: readUserRes.user!.role!,
                    name: readUserRes.user.name,
                    id: readUserRes.user.id!
                };
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
            return baseUrl
        },
        async signIn({ user, account, profile }) {
            const readUserRes = await readUserUtil(user);

            if (!readUserRes.user) {

                const createUserRes = await createUserUtil(user);

                if (!createUserRes.user) {
                    return false
                }
                user.role = createUserRes.user.role!;
                user.id = createUserRes.user.id!;
            } else {
                user.role = readUserRes.user.role!;
                user.id = readUserRes.user.id!;
            }

            return true;
        },
        async jwt({ token, user, session }) {
            if (user && user.role && user.id) {
                token.role = user.role;
                token.id = user.id;
            }

            return token;
        },
        session: async ({ session, user, token }) => {
            if (token.role && token.id) {
                session.user.role = token.role;
                session.user.id = token.id;
            }

            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/signin",
    },
    debug: true,
}