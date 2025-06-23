// src/app/(pages)/notice/[noticeId]/components/NoticeBanner.tsx
"use client";

import React from "react";
import type { NoticeMock } from "@/__mocks__/noticeMock";
import ImportantBanner from "./ImportantBanner";
import NormalBanner from "./NormalBanner";

interface Props {
    notice: NoticeMock;
}

export default function NoticeBanner({ notice }: Props) {
    // isImportant 에 따라 두 가지 배너 중 하나를 렌더링
    return notice.isImportant ? (
        <ImportantBanner notice={notice} />
    ) : (
        <NormalBanner notice={notice} />
    );
}
