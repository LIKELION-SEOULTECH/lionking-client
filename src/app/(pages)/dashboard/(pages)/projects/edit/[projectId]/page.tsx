"use client";

import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { AnimatePresence, motion } from "motion/react";
import SuccessPage from "@/components/forms/views/SuccessPage";
import GenericBanner from "@/components/banners/GenericBanner";
import ProjectForm from "@/components/forms/custom/ProjectForm";
import {
    getProjectFormConfig,
    ProjectFormValues,
} from "@/components/forms/configs/projectFormConfig";
import { get_projects_projectId } from "@/lib/api/endpoints/project";
import { projectToFormValues } from "@/lib/api/mappers/project.mapper";
import { LoaderCircle } from "lucide-react";

export default function EditProjectPage() {
    const params = useParams<{ projectId: string }>();
    const projectId = params.projectId;

    const [isSuccess, setIsSuccess] = useState(false);
    const { banner, form } = getProjectFormConfig({ isEdit: true, projectId });

    const [initialValues, setInitialValues] = useState<ProjectFormValues | null>(null);
    const [projectNotFound, setProjectNotFound] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!projectId) return;

            const project = await get_projects_projectId(projectId);

            if (!project) {
                setProjectNotFound(true);
                return;
            }

            const data: ProjectFormValues = await projectToFormValues(project);

            setInitialValues({
                ...form.initialValues,
                ...data,
            });
        };

        fetchData();
    }, [projectId]);

    if (projectNotFound) return redirect("/archive/projects");

    if (!initialValues)
        return (
            <div className="flex items-center justify-center w-full text-center py-50">
                <LoaderCircle className="animate-spin" />
            </div>
        );

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
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                                delay: 0.3,
                            }}
                        >
                            <SuccessPage
                                title={form.successConfig?.title || "등록이 완료되었습니다."}
                                buttonLabel={form.successConfig?.buttonLabel || "목록 보기"}
                                href={form.successConfig?.href || "/"}
                            />
                        </motion.div>

                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full bg-orange-main"
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
                    className="w-full min-h-screen bg-white"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <GenericBanner title={banner.title} icon={banner.icon} />

                    <div className="w-full max-w-[1100px] mx-auto px-6 lg:px-4 xl:px-0 py-16">
                        <Formik
                            initialValues={initialValues}
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
                            <ProjectForm />
                        </Formik>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
