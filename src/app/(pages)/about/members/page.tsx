import { Member } from "@/types";
import MembersBanner from "./sections/MembersBanner/MembersBanner";
import MembersGrid from "./sections/MembersGrid";

export default async function MembersPage() {
    const membersData = await import("@/__mocks__/membersMock");
    const members = membersData.default as Member[];

    return (
        <>
            <MembersBanner />

            <MembersGrid members={members} />
        </>
    );
}
