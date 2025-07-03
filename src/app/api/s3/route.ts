import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const prefix = (formData.get("prefix") as string) ?? "uploads";

        if (!file) {
            return NextResponse.json({ message: "No file provided" }, { status: 400 });
        }

        const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/s3`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fileName: `${Date.now()}-${file.name}`,
                prefix,
            }),
        });

        if (!backendRes.ok) {
            const error = await backendRes.text();
            console.error("Presign error:", error);
            return NextResponse.json({ message: "Failed to get presigned URL" }, { status: 500 });
        }

        const presigned = await backendRes.json();
        const { url, filePath } = presigned.data;

        const s3UploadRes = await fetch(url, {
            method: "PUT",
            body: Buffer.from(await file.arrayBuffer()),
            headers: {
                "Content-Type": file.type,
                "Content-Length": file.size.toString(),
            },
        });

        if (!s3UploadRes.ok) {
            const error = await s3UploadRes.text();
            console.error("S3 upload failed:", error);
            return NextResponse.json({ message: "S3 upload failed" }, { status: 500 });
        }

        const publicUrl = `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${filePath}`;

        return NextResponse.json({ publicUrl }, { status: 200 });
    } catch (err) {
        console.error("Unhandled upload error:", err);
        return NextResponse.json({ message: "Unexpected error occurred" }, { status: 500 });
    }
}
