import { NextRequest, NextResponse } from "next/server";
import { NewsRequest } from "@/types";
import { post_activity } from "@/lib/api/endpoints/activity";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ authorId: string }> }
) {
    try {
        const { authorId } = await params;
        const body: NewsRequest = await req.json();

        const res = await post_activity(authorId, body);

        if (res.status === 201) {
            return NextResponse.json(res.data, { status: 201 });
        } else {
            return NextResponse.json(
                { message: "활동기록 등록에 실패했습니다.", status: res.status },
                { status: res.status }
            );
        }
    } catch (error) {
        return NextResponse.json(
            {
                message: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
            },
            { status: 500 }
        );
    }
}
