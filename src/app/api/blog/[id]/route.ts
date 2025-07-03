import { patch_blog_blogId, post_blog_authorId, PostBlogRequest } from "@/lib/api/endpoints/blog";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body: PostBlogRequest = await req.json();

    post_blog_authorId(id, body);

    return NextResponse.json(
        { message: "블로그 등록 요청이 성공적으로 처리되었습니다." },
        { status: 201 }
    );
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body: PostBlogRequest = await req.json();

    patch_blog_blogId(id, body);

    return NextResponse.json(
        { message: "블로그 수정 요청이 성공적으로 처리되었습니다." },
        { status: 201 }
    );
}
