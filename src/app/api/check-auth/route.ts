import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();

    const access = cookieStore.get("access_token"); // 백엔드 /auth/me 나오면 나중에 수정할 예정

    if (!access) {
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    return NextResponse.json({
        code: "OK",
        message: "인증 성공",
        data: {
            memberId: 2,
            username: "임도협",
            profileImage: null,
            department: null,
            position: "FRONTEND",
            role: "GUEST",
            descriptionTag: null,
            description: null,
            techStack: null,
            portfolioUrls: null,
        },
    }); // mock
}
