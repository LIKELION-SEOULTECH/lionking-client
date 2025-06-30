import { createFetchClient } from "@/lib/api/fetchJson";
import { memberMapper } from "../mappers/member.mapper";

export async function get_member_memberId(memberId: string | number) {
    const fetchJson = await createFetchClient();
    return fetchJson(`/api/v1/member/${memberId}`, {
        method: "GET",
    }).then((res) => memberMapper(res.data));
}

export async function put_member_memberId(memberId: string | number, body: any) {
    const fetchJson = await createFetchClient();

    return fetchJson(`/api/v1/member/${memberId}`, {
        method: "PUT",
        body,
    });
}

export async function get_member() {
    const fetchJson = await createFetchClient();

    return fetchJson("/api/v1/member", {
        method: "GET",
    });
}
