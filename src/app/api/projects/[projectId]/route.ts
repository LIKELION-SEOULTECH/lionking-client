import { get_projects_projectId } from "@/lib/api/endpoints/project";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        const { projectId } = await params;

        const res = await get_projects_projectId(projectId);

        if (res) {
            return NextResponse.json({ status: 200, data: res });
        } else {
            return NextResponse.json({ message: "프로젝트 조회에 실패했습니다." }, { status: 500 });
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
