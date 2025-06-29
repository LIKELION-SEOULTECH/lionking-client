export function getBaseUrl(): string {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base) {
        throw new Error("Missing NEXT_PUBLIC_API_BASE_URL");
    }
    return base.replace(/\/+$/, "");
}
