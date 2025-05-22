"use client";

import { useState } from "react";
import RoleSelector from "./components/RoleSelector";
import { RoleFilters } from "@/types";
import ProfileCard from "@/components/ui/ProfileCard";
import type { Member } from "@/types";

type MembresGridProps = {
    members: Member[];
};

export default function MembersGrid({ members }: MembresGridProps) {
    const [selectedRole, setSelectedRole] = useState<RoleFilters>("전체");
    return (
        <>
            <RoleSelector selectedRole={selectedRole} onChange={setSelectedRole} />

            <div className="w-full flex flex-col items-center justify-center px-4 md:px-0 py-16 md:py-[200px]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[29px] gap-y-8">
                    {members.map((member) => (
                        <ProfileCard
                            key={member.id}
                            name={member.name}
                            major={member.major}
                            userTags={[member.position, member.role]}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
