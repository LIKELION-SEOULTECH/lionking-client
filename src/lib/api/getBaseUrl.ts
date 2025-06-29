export function getBaseUrl(): string {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base) {
        return "http://localhost:3000";
    }
    return base;
}
