import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getProjectYearOptions(gens: number[]): string[] {
    return ["전체", ...gens.map((g) => `${g}기`)];
}

export function labelToGeneration(label: string): number | null {
    return label === "전체" ? null : parseInt(label.replace("기", ""), 10);
}

export function generationToLabel(generation?: number): string {
    return generation === undefined || generation === null ? "전체" : `${generation}기`;
}

export function extractSummary(html: string, maxLength: number = 100): string {
    const text = html.replace(/<[^>]*>/g, "").trim();

    const normalized = text.replace(/\s+/g, " ");

    if (normalized.length > maxLength) {
        return normalized.slice(0, maxLength).trim() + "...";
    }

    return normalized;
}

const S3_BASE_URL = "https://lionking-bucket2.s3.ap-northeast-2.amazonaws.com";

export function getFullS3Url(s3Key?: string | null): string | undefined {
    if (!s3Key) return undefined;
    return `${process.env.NEXT_PUBLIC_S3_BASE_URL ?? S3_BASE_URL}/${s3Key}`;
}

export function extractFilePathFromS3Url(url: string): string {
    try {
        const baseUrl = (process.env.NEXT_PUBLIC_S3_BASE_URL ?? S3_BASE_URL).replace(/\/+$/, "");

        if (!url.startsWith(baseUrl)) {
            throw new Error("Invalid S3 URL");
        }

        return url.slice(baseUrl.length + 1);
    } catch (error) {
        throw new Error("Failed to extract file path from S3 URL");
    }
}

export function extractS3KeysFromHtml(content: string): { s3Key: string; mediaType: "IMAGE" }[] {
    const matches = [...content.matchAll(/src="https:\/\/[^\/]+\/([^"]+)"/g)];
    const keys = matches.map(([, path]) => ({
        s3Key: path,
        mediaType: "IMAGE" as const,
    }));

    return keys;
}

export function parsePublicUrlFromPresignedUrl(presignedUrl: string): string {
    try {
        const url = new URL(presignedUrl);
        return `${url.origin}${url.pathname}`;
    } catch {
        throw new Error("Invalid S3 presigned URL");
    }
}
