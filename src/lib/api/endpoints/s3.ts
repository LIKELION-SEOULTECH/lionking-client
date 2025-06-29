import { fetchJson } from "@/lib/api/fetchJson";

export async function put_s3(body: any) {
    return fetchJson("/api/v1/s3", {
        method: "PUT",
        body,
    });
}
