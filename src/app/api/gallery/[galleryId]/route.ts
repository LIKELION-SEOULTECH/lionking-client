import { get_activity_activityId, patch_activity_activityId } from "@/lib/api/endpoints/activity";
import { NewsRequest } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ galleryId: string }> }
) {
    try {
        const { galleryId } = await params;

        const res = await get_activity_activityId(galleryId);

        if (res) {
            return NextResponse.json({ status: 200, data: res });
        } else {
            return NextResponse.json({ message: "활동기록 조회에 실패했습니다." }, { status: 500 });
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

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ galleryId: string }> }
) {
    try {
        const { galleryId } = await params;

        const body: NewsRequest = await req.json();

        const res = await patch_activity_activityId(galleryId, body);

        if (res.status === 201) {
            return NextResponse.json(res.data, { status: 201 });
        } else {
            return NextResponse.json(
                { message: "활동기록 수정에 실패했습니다.", status: res.status },
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
