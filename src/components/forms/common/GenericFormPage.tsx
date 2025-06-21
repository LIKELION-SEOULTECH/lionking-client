"use client";

import { useState } from "react";
import { Formik } from "formik";
import { AnimatePresence, motion } from "motion/react";
import SuccessPage from "../views/SuccessPage";
import SummaryPage from "../views/SummaryPage";
import GenericBanner from "@/components/banners/GenericBanner";
import GenericFormBuilder from "./GenericFormBuilder";
import { GenericFormPageConfig } from "../types/FormConfig.types";

export default function GenericFormPage<V extends Record<string, unknown>>({
    config,
}: {
    config: GenericFormPageConfig<V>;
}) {
    const [isSuccess, setIsSuccess] = useState(false);
    const { banner, form, isBlog } = config;

    return (
        <AnimatePresence mode="wait">
            {isSuccess ? (
                <>
                    <motion.div
                        className="fixed inset-0 bg-white z-0"
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
                            initial={isBlog ? { opacity: 0 } : { scale: 0 }}
                            animate={isBlog ? { opacity: 1 } : { scale: 1 }}
                            transition={{
                                type: isBlog ? "tween" : "spring",
                                duration: isBlog ? 0.4 : undefined,
                                ease: isBlog ? "easeOut" : undefined,
                                stiffness: isBlog ? undefined : 200,
                                damping: isBlog ? undefined : 20,
                                delay: 0.3,
                            }}
                        >
                            {isBlog ? (
                                <SummaryPage />
                            ) : (
                                <SuccessPage
                                    title={form.successConfig?.title || "등록이 완료되었습니다."}
                                    buttonLabel={form.successConfig?.buttonLabel || "목록 보기"}
                                    href={form.successConfig?.href || "/"}
                                />
                            )}
                        </motion.div>

                        {!isBlog &&
                            [...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-orange-main rounded-full"
                                    initial={{
                                        top: "50%",
                                        left: "50%",
                                        scale: 0,
                                    }}
                                    animate={{
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                        scale: [0, 1.5, 0],
                                        rotate: Math.random() * 360,
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: 0.5 + i * 0.05,
                                        ease: "easeOut",
                                    }}
                                />
                            ))}
                    </motion.div>
                </>
            ) : (
                <motion.div
                    key="form"
                    className="min-h-screen w-full bg-white"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <GenericBanner title={banner.title} icon={banner.icon} />

                    <div className="w-full max-w-[1100px] mx-auto px-6 lg:px-4 xl:px-0 py-16">
                        <Formik
                            initialValues={form.initialValues}
                            validationSchema={form.validationSchema}
                            validateOnMount={true}
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    await form.onSubmit(values);
                                    setIsSuccess(true);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                } catch (error) {
                                    console.error("Submit error:", error);
                                } finally {
                                    setSubmitting(false);
                                }
                            }}
                        >
                            <GenericFormBuilder
                                sections={form.sections}
                                submitButtonText={form.submitButtonText}
                                isEditMode={Object.values(form.initialValues).some(
                                    (v) => v != null && v !== ""
                                )}
                            />
                        </Formik>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
