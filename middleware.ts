import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        if (req.nextUrl.pathname.startsWith("/dashboard") && req.nextauth.token?.role !== "admin") {
            return NextResponse.rewrite(
                new URL("/auth/login?message=Not Authorized", req.url)
            );
        }

        if (req.nextUrl.pathname.startsWith("/NewPublish") && req.nextauth.token?.role !== "user") {
            return NextResponse.rewrite(
                new URL("/auth/login?message=Not Authorized", req.url)
            );
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/dashboard", "/NewPublish", "/NewPublish"],
};