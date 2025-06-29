import MembersBanner from "./sections/MembersBanner/MembersBanner";
import MembersGrid from "./sections/MembersGrid";
import { Member } from "@/types";
import { get_member } from "@/lib/api/endpoints/member";
import { memberMapper } from "@/lib/api/mappers/member.mapper";

export default async function MembersPage() {
    const data = await get_member().then((res) => res.data);

    const members: Member[] = data.map(memberMapper);

    return (
        <>
            <MembersBanner />

            <MembersGrid members={members} />
        </>
    );
}
