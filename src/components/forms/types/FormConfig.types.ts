import { ReactNode } from "react";
import * as Yup from "yup";

export type FieldType =
    | "text"
    | "textarea"
    | "select"
    | "radio"
    | "custom"
    | "imageDropzone"
    | "memberSelector";

export interface FormFieldConfig {
    name: string;
    type: FieldType;
    label: string;
    description?: string;
    placeholder?: string;
    required?: boolean;
    validation?: Yup.Schema<any>;
    limit?: number;
    options?: { label: string; value: string }[];
    customComponent?: ReactNode;
    multiple?: boolean;
    maxFiles?: number;
    accept?: string;
    defaultLayout?: "full" | "grid";
}

export interface FormSectionConfig {
    title: string;
    description?: string;
    fields: FormFieldConfig[];
}

export interface FormConfig {
    sections: FormSectionConfig[];
    initialValues: Record<string, any>;
    validationSchema?: Yup.ObjectSchema<any>;
    onSubmit: (values: any) => Promise<void> | void;
    submitButtonText?: string;
    successConfig?: {
        title: string;
        buttonLabel: string;
        href: string;
    };
}

export interface GenericFormPageConfig {
    banner: {
        title: string;
        icon?: ReactNode;
    };
    form: FormConfig;
}
