import { post_blog_authorId, PostBlogRequest } from "@/lib/api/endpoints/blog";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ authorId: string }> }
) {
    try {
        const { authorId } = await params;
        const body: PostBlogRequest = await req.json();

        const res = await post_blog_authorId(authorId, body);

        if (!res || !res.status) {
            return NextResponse.json(
                { message: "서버 응답이 없습니다. 블로그 등록에 실패했습니다." },
                { status: 502 }
            );
        }

        if (res.status === 201) {
            return NextResponse.json(res.data, { status: 201 });
        } else {
            return NextResponse.json(
                { message: "블로그 등록에 실패했습니다.", status: res.status },
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
