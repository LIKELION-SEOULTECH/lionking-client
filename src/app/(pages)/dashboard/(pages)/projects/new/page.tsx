"use client";

import { useRouter } from "next/navigation";
import { Formik } from "formik";
import NewProjectBanner from "./components/NewProjectBanner";
import { ProjectRecap } from "./types";
import { validationSchema } from "./utils/FormValidationSchema";
import ProjectFormContent from "./components/NewProjectFormContent";

export default function NewProjectPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen w-full bg-white">
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
                        } catch (error) {
                            console.error("Submit error:", error);
                        } finally {
                            setSubmitting(false);
                            router.push("/archive/projects");
                        }
                    }}
                >
                    <ProjectFormContent />
                </Formik>
            </div>
        </div>
    );
}
