import { NextResponse } from "next/server";
import { get_member } from "@/lib/api/endpoints/member";

export async function GET() {
    try {
        const data = await get_member();

        return NextResponse.json({
            data,
        });
    } catch (error) {
        return NextResponse.json(
            {
                code: "INTERNAL_SERVER_ERROR",
                message: error instanceof Error ? error.message : "알 수 없는 오류",
            },
            { status: 500 }
        );
    }
}
