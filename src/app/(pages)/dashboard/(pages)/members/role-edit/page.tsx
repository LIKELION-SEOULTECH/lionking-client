// src/app/(pages)/dashboard/(pages)/members/role-edit/page.tsx
"use client";

import MemberRoleTable from "./components/MemberRoleTable";

export default function MemberRoleEditPage() {
    return (
        <main className="bg-white">
            <div className="max-w-[1440px] mx-auto px-[190px] pt-[132px] pb-[120px] text-gray-800">
                <h1 className="head3_sb">회원 권한 수정</h1>
                <div className="mt-[50px]">
                    <MemberRoleTable />
                </div>
            </div>
        </main>
    );
}
