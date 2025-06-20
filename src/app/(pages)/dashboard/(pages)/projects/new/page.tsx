"use client";

import { useState } from "react";
import { Formik } from "formik";
import { AnimatePresence, motion } from "motion/react";
import NewProjectBanner from "./components/NewProjectBanner";
import { ProjectRecap } from "./types";
import { validationSchema } from "./utils/FormValidationSchema";
import ProjectFormContent from "./components/NewProjectFormContent";
import SuccessPage from "@/components/ui/SuccessPage";

export default function NewProjectPage() {
    const [isSuccess, setIsSuccess] = useState(false);

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
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                                delay: 0.3,
                            }}
                        >
                            <SuccessPage
                                title="프로젝트 등록이 완료되었습니다."
                                buttonLabel="프로젝트 보러가기"
                                href="/archive/projects"
                            />
                        </motion.div>

                        {[...Array(20)].map((_, i) => (
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
                    <NewProjectBanner />

                    <div className="w-full max-w-[1100px] mx-auto px-6 lg:px-4 xl:px-0 py-16">
                        <Formik<{
                            projectName: string;
                            projectType: string;
                            projectDescription: string;
                            projectYear: string;
                            projectVideo: string;
                            projectMembers: Array<{
                                id: string;
                                name: string;
                                part: string;
                                profileImage?: string;
                            }>;
                            projectThumbnail: string;
                            projectLandingImages: string[];
                            projectRecaps: ProjectRecap[];
                        }>
                            initialValues={{
                                projectName: "",
                                projectType: "",
                                projectDescription: "",
                                projectYear: "",
                                projectVideo: "",
                                projectMembers: [],
                                projectThumbnail: "",
                                projectLandingImages: [],
                                projectRecaps: [],
                            }}
                            validationSchema={validationSchema}
                            validateOnMount={true}
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    await new Promise((resolve) => setTimeout(resolve, 2000));
                                    console.log("submitted:", values);
                                    setIsSuccess(true);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                } catch (error) {
                                    console.error("Submit error:", error);
                                } finally {
                                    setSubmitting(false);
                                }
                            }}
                        >
                            <ProjectFormContent />
                        </Formik>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
