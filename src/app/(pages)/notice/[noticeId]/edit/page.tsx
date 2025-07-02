// src/app/(pages)/notice/[noticeId]/edit/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Formik } from "formik";
import { AnimatePresence, motion } from "motion/react";

import GenericBanner from "@/components/banners/GenericBanner";
import GenericFormBuilder from "@/components/forms/common/GenericFormBuilder";
import SuccessPage from "@/components/forms/views/SuccessPage";

import {
    noticeFormConfig,
    type NoticeFormValues,
} from "@/components/forms/configs/noticeFormConfig";
import type { NoticeDetail } from "@/lib/api/mappers/notice.mapper";

export default function EditNoticePage() {
    const { noticeId } = useParams<{ noticeId: string }>();

    // ↓ 여기서 noticeFormConfig 복제 + onSubmit 덮어쓰기 ↓
    const editConfig = {
        banner: {
            ...noticeFormConfig.banner,
            title: "공지사항 수정하기",
        },
        form: {
            ...noticeFormConfig.form,

            /** 🚀 onSubmit을 PATCH 호출로 덮어쓰기 */
            onSubmit: async (values: NoticeFormValues) => {
                const payload = {
                    noticeType: values.noticeType === "important" ? "IMPORTANT" : "GENERAL",
                    title: values.title,
                    content: values.content,
                    contentMedia: values.attachments.map((s3Key) => ({
                        s3Key,
                        mediaType: "IMAGE" as const,
                    })),
                };

                const res = await fetch(`/api/notice/${noticeId}`, {
                    method: "PATCH", // PATCH 요청!
                    credentials: "include", // 쿠키 전송
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                if (!res.ok) {
                    const err = await res.json().catch(() => ({}));
                    throw new Error(err.message || `status ${res.status}`);
                }
            },

            submitButtonText: "수정하기",
            successConfig: {
                title: "공지사항이 수정되었습니다.",
                buttonLabel: "공지사항 목록 보기",
                href: "/notice",
            },
        },
    };
    // ↑ 여기까지 editConfig 정의 ↑

    const { banner, form } = editConfig;
    const [initialValues, setInitialValues] = useState<NoticeFormValues | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    // 초기값 불러오기 (GET /api/notice/{noticeId})
    useEffect(() => {
        if (!noticeId) return;
        (async () => {
            try {
                const res = await fetch(`/api/notice/${noticeId}`, {
                    cache: "no-store",
                });
                if (!res.ok) throw new Error();
                const notice: NoticeDetail = await res.json();

                setInitialValues({
                    ...form.initialValues,
                    noticeType: notice.isImportant ? "important" : "general",
                    title: notice.title,
                    content: notice.content.join("\n\n"),
                    attachments: notice.contentMedia.map((m) => m.s3Key),
                });
            } catch (err) {
                console.error("공지 상세 로드 실패:", err);
            }
        })();
    }, [noticeId, form.initialValues]);

    if (!initialValues) {
        return <div className="py-40 text-center text-gray-500">불러오는 중…</div>;
    }

    return (
        <AnimatePresence mode="wait">
            {isSuccess ? (
                <>
                    <motion.div
                        className="fixed inset-0 z-0 bg-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.div
                        className="relative z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
                        >
                            <SuccessPage
                                title={form.successConfig.title}
                                buttonLabel={form.successConfig.buttonLabel}
                                href={form.successConfig.href}
                            />
                        </motion.div>
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-orange-main rounded-full"
                                initial={{ top: "50%", left: "50%", scale: 0 }}
                                animate={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    scale: [0, 1.5, 0],
                                    rotate: Math.random() * 360,
                                }}
                                transition={{ duration: 2, delay: 0.5 + i * 0.05, ease: "easeOut" }}
                            />
                        ))}
                    </motion.div>
                </>
            ) : (
                <motion.div
                    key="form"
                    className="min-h-screen bg-white"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <GenericBanner title={banner.title} icon={banner.icon} />
                    <div className="max-w-[1100px] mx-auto px-6 py-16">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={form.validationSchema}
                            validateOnMount
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    await form.onSubmit(values);
                                    setIsSuccess(true);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                } catch (err) {
                                    console.error("수정 실패:", err);
                                } finally {
                                    setSubmitting(false);
                                }
                            }}
                        >
                            <GenericFormBuilder
                                sections={form.sections}
                                submitButtonText={form.submitButtonText}
                                isEditMode
                            />
                        </Formik>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
