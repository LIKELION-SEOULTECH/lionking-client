import { NextRequest, NextResponse } from "next/server";
import { get_member_memberId } from "@/lib/api/endpoints/member";

export async function GET(req: NextRequest, { params }: { params: Promise<{ memberId: string }> }) {
    try {
        const { memberId } = await params;
        const data = await get_member_memberId(memberId);

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
