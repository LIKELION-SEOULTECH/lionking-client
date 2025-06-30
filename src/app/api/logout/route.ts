import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json({ success: true });

    res.cookies.set({
        name: "access_token",
        value: "",
        path: "/",
        maxAge: 0,
    });

    res.cookies.set({
        name: "refresh_token",
        value: "",
        path: "/",
        maxAge: 0,
    });

    return res;
}
