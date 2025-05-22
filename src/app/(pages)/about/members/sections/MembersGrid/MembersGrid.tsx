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

            <ProfileCard
                name="김사자"
                major="금속공에디자인학과"
                userTags={["기획", "운영진", "홍보부"]}
            />

            <ProfileCard
                name="김사자"
                major="금속공에디자인학과"
                userTags={["기획", "운영진", "홍보부"]}
                size="large"
                transparency="transparent"
            />

            <ProfileCard
                name="김사자"
                major="금속공에디자인학과"
                userTags={["기획", "운영진", "홍보부"]}
                size="small"
                transparency="transparent"
            />
        </>
    );
}
