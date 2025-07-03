import React from "react";
import NoticeBanner from "./components/NoticeBanner";
import NoticeList from "./components/NoticeList";

export const revalidate = 60;

export default function NoticePage() {
    return (
        <>
            <NoticeBanner />
            <NoticeList />
        </>
    );
}
