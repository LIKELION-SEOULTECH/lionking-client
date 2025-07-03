"use client";

import dynamic from "next/dynamic";
import { Form, useFormikContext } from "formik";
import { FormFieldConfig, FormSectionConfig } from "../types/FormConfig.types";
import { FormSection, Input, TextArea, Select, RadioGroup } from "./FormComponents";
import ImageDropZone from "./ImageDropZone";
import MemberSelector from "./MemberSelector";

const BlogEditor = dynamic(() => import("./BlogEditor/BlogEditor"), {
    ssr: false,
    loading: () => <div className="w-full h-[400px] bg-gray-50 animate-pulse rounded-[10px]" />,
});

interface GenericFormBuilderProps<V extends Record<string, unknown>> {
    sections: FormSectionConfig<V>[];
    submitButtonText?: string;
    isEditMode?: boolean;
}

function renderField(field: FormFieldConfig) {
    switch (field.type) {
        case "text":
            return (
                <Input
                    key={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    limit={field.limit}
                    className="w-full"
                />
            );

        case "textarea":
            return (
                <TextArea
                    key={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    limit={field.limit}
                    className="w-full"
                />
            );

        case "select":
            return <Select key={field.name} name={field.name} options={field.options || []} />;

        case "radio":
            return <RadioGroup key={field.name} name={field.name} options={field.options || []} />;

        case "imageDropzone":
            return (
                <ImageDropZone
                    key={field.name}
                    name={field.name}
                    multiple={field.multiple}
                    maxFiles={field.maxFiles}
                    accept={field.accept}
                    defaultLayout={field.defaultLayout}
                />
            );

        case "memberSelector":
            return <MemberSelector key={field.name} name={field.name} />;

        case "blogEditor":
            return (
                <BlogEditor key={field.name} name={field.name} placeholder={field.placeholder} />
            );

        case "custom":
            return field.customComponent;

        default:
            return null;
    }
}

export default function GenericFormBuilder<V extends Record<string, unknown>>({
    sections,
    submitButtonText = "등록하기",
    isEditMode = false,
}: GenericFormBuilderProps<V>) {
    const { isValid, isSubmitting, dirty } = useFormikContext();

    return (
        <Form className="flex flex-col gap-12">
            {sections.map((section, sectionIndex) => (
                <FormSection
                    key={sectionIndex}
                    title={section.title}
                    description={section.description}
                    isRequired={section.fields.some((field) => field.required)}
                >
                    {section.fields.map((field) => renderField(field))}
                </FormSection>
            ))}

            <div className="w-full flex justify-center mt-50">
                <button
                    type="submit"
                    disabled={!isValid || isSubmitting || (!dirty && !isEditMode)}
                    className="py-3 px-22.5 bg-orange-main sub3_sb text-white rounded-[8px] hover:bg-orange-main/85 transition-colors duration-200 cursor-pointer disabled:bg-gray-3 disabled:cursor-not-allowed disabled:hover:bg-gray-3 flex items-center justify-center gap-2 min-w-[120px] h-[48px]"
                >
                    {isSubmitting ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            <span>등록 중...</span>
                        </>
                    ) : (
                        <span className="inline-block w-[72px] text-center">
                            {submitButtonText}
                        </span>
                    )}
                </button>
            </div>
        </Form>
    );
}
