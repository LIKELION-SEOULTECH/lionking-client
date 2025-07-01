import { NextRequest, NextResponse } from "next/server";
import { post_projects, PostProjectRequest } from "@/lib/api/endpoints/project";

export async function POST(req: NextRequest) {
    try {
        const body: PostProjectRequest = await req.json();

        const res = await post_projects(body);

        if (res.status === 201) {
            return NextResponse.json(res.data, { status: 201 });
        } else {
            return NextResponse.json(
                { message: "프로젝트 등록에 실패했습니다.", status: res.status },
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
