"use client";

import { useState } from "react";
import RoleSelector from "./components/RoleSelector";
import { RoleFilters } from "@/types";
import ProfileCard from "@/components/ui/ProfileCard";

export default function MembersGrid() {
    const [selectedRole, setSelectedRole] = useState<RoleFilters>("전체");
    return (
        <>
            <RoleSelector selectedRole={selectedRole} onChange={setSelectedRole} />

            <div className="w-full flex flex-col items-center justify-center px-4 md:px-0 py-16 md:py-[200px]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[29px] gap-y-8">
                    {Array.from({ length: 9 }, (_, index) => (
                        <ProfileCard
                            key={index}
                            name="김사자"
                            major="인공지능학과"
                            userTags={["프론트엔드", "아기사자"]}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
