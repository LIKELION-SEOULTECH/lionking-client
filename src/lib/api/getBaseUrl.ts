export function getBaseUrl(): string {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base) {
        return "http://15.164.107.219:8080";
    }
    return base;
}
