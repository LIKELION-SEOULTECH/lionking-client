import MembersBanner from "./sections/MembersBanner/MembersBanner";
import MembersGrid from "./sections/MembersGrid";
import { get_member } from "@/lib/api/endpoints/member";

export default async function MembersPage() {
    const members = await get_member();

    return (
        <>
            <MembersBanner />

            <MembersGrid members={members} />
        </>
    );
}
