import { fetchJson } from "@/lib/api/fetchJson";

export async function put_admin_question(body: any) {
    return fetchJson("/api/v1/admin/question", {
        method: "PUT",
        body,
    });
}

export async function get_question_termId(termId: string | number) {
    return fetchJson(`/api/v1/question/${termId}`, {
        method: "GET",
    });
}
