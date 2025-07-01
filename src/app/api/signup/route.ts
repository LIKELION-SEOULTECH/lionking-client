import { NextRequest, NextResponse } from "next/server";
import { createFetchClient } from "@/lib/api/fetchJson";
import { Parts } from "@/types";

type SignUpRequest = {
    loginId: string;
    password: string;
    username: string;
    email: Parts;
};

export async function POST(req: NextRequest) {
    const signUpRequest: SignUpRequest = await req.json();
    const fetchJson = await createFetchClient();

    console.log("Received sign-up request:", signUpRequest);

    try {
        await fetchJson<{
            code: string;
            message: string;
            data: {
                userId: number;
                memberId: string;
                loginId: number;
                email: number;
                position: string;
                role: string;
            };
        }>("/api/v1/user/signup", {
            method: "POST",
            body: signUpRequest,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json(
            { success: false, error: (err as Error).message },
            { status: 400 }
        );
    }
}
