import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/context/ReduxProvider";
import ToasterContext from "@/context/ToasterContext";
import Navbar from "@/components/Navbar";
import { Ubuntu } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import { mainDescription, title } from "@/constants/constants";

const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"]
});

export const metadata: Metadata = {
    title: title,
    description: mainDescription,
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${ubuntu.className} bg-gradient-to-b from-black to-purple-900 text-white h-full min-h-screen`}>
                <ReduxProvider>
                    <AuthProvider>
                        <ToasterContext />
                        <Navbar />
                        <main className="w-full h-full min-h-screen flex flex-col items-center">
                            {children}
                        </main>
                    </AuthProvider>
                </ReduxProvider>
            </body>
        </html>
    );
}
