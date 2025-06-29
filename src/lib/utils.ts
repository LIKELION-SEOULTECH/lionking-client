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

const S3_BASE_URL = "https://lionking-bucket2.s3.ap-northeast-2.amazonaws.com/";

export function getFullS3Url(s3Key?: string | null): string | undefined {
    if (!s3Key) return undefined;
    return `${S3_BASE_URL}${s3Key}`;
}
