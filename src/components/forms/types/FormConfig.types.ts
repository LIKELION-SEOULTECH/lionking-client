import { ReactNode } from "react";
import * as Yup from "yup";

export type FieldType =
    | "text"
    | "textarea"
    | "select"
    | "radio"
    | "custom"
    | "imageDropzone"
    | "memberSelector"
    | "blogEditor";

export interface FormFieldConfig<TField = unknown> {
    name: string;
    type: FieldType;
    label: string;
    description?: string;
    placeholder?: string;
    required?: boolean;
    validation?: Yup.Schema<TField>;
    limit?: number;
    options?: { label: string; value: string }[];
    customComponent?: ReactNode;
    multiple?: boolean;
    maxFiles?: number;
    accept?: string;
    defaultLayout?: "full" | "grid";
}

export interface FormSectionConfig<V extends Record<string, unknown>> {
    title: string;
    description?: string;
    fields: FormFieldConfig<V[keyof V]>[];
}

export interface FormConfig<V extends Record<string, unknown>> {
    sections: FormSectionConfig<V>[];
    initialValues: V;
    validationSchema?: Yup.ObjectSchema<V>;
    onSubmit: (values: V) => Promise<void> | void;
    submitButtonText?: string;
    successConfig?: {
        title: string;
        buttonLabel: string;
        href: string;
    };
}

export interface GenericFormPageConfig<V extends Record<string, unknown>> {
    banner: {
        title: string;
        icon?: ReactNode;
    };
    form: FormConfig<V>;
    isBlog?: boolean;
}
