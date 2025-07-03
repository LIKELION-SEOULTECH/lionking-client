"use client";

import GenericFormPage from "@/components/forms/common/GenericFormPage";
import { noticeFormConfig } from "@/components/forms/configs/noticeFormConfig";

export default function NewNoticePage() {
    return <GenericFormPage config={noticeFormConfig} />;
}
