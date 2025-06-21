import { cn } from "@/lib/utils";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

export function FormSection({
    title,
    description,
    isRequired = false,
    children,
}: {
    title: string;
    description?: string;
    isRequired?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div className="w-full flex flex-col gap-4 items-start justify-start">
            <div className="flex flex-col gap-2 items-start justify-start">
                <div className="flex items-start justify-center gap-2">
                    <h2 className="sub1_sb text-black">{title}</h2>
                    {isRequired && <div className="size-2.5 bg-orange-main rounded-full" />}
                </div>
                {description && <p className="body5_r text-gray-4">{description}</p>}
            </div>
            <div className="w-full flex flex-col self-start justify-self-start items-start justify-start gap-5">
                {children}
            </div>
        </div>
    );
}

export function Input({
    name,
    className,
    limit,
    ...props
}: {
    name: string;
    limit?: number;
    className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name">) {
    const [field, meta] = useField(name);

    return (
        <div className={cn(className)}>
            <input
                {...field}
                {...props}
                maxLength={limit}
                className="w-full px-7 py-3 border border-gray-2 rounded-[10px] body5_r text-gray-8 focus:ring-1 focus:outline-none focus:ring-orange-500 transition-color duration-200"
            />

            <div className="flex justify-between items-center mt-2.5 w-full min-h-[1.25rem]">
                {meta.touched && meta.error ? (
                    <p className="body5_r text-red-500">{meta.error}</p>
                ) : (
                    <span />
                )}
                {limit !== undefined && (
                    <div className="text-gray-3 body5_r text-right">
                        {field.value.length}/{limit}
                    </div>
                )}
            </div>
        </div>
    );
}

export function RadioGroup({
    name,
    className,
    options,
}: {
    name: string;
    className?: string;
    options: { label: string; value: string }[];
}) {
    const [field, meta, helpers] = useField(name);
    return (
        <>
            <div className={cn("flex flex-wrap gap-2", className)}>
                {options.map((opt) => {
                    const isChecked = field.value === opt.value;
                    return (
                        <label key={opt.value} className="cursor-pointer">
                            <input
                                type="radio"
                                name={name}
                                value={opt.value}
                                checked={isChecked}
                                onChange={() => helpers.setValue(opt.value)}
                                className="hidden"
                            />
                            <div
                                className={cn(
                                    "flex items-center justify-center px-3 py-2 gap-1 body4_m rounded-full transition-colors duration-200 whitespace-nowrap min-w-fit",
                                    isChecked
                                        ? "bg-orange-light-1 border border-orange-main text-orange-main"
                                        : "bg-gray-1 border border-gray-3 text-gray-3"
                                )}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="13"
                                    height="10"
                                    viewBox="0 0 13 10"
                                    fill="none"
                                    className="shrink-0"
                                >
                                    <path
                                        d="M11.3359 1.67188L4.66927 8.33854L1.33594 5.00521"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                {opt.label}
                            </div>
                        </label>
                    );
                })}
            </div>
            {meta.touched && meta.error && (
                <p className="body5_r text-red-500 mt-2">{meta.error}</p>
            )}
        </>
    );
}

export function Select({
    name,
    className,
    options,
}: {
    name: string;
    className?: string;
    options: { label: string; value: string }[];
}) {
    const [field, meta] = useField(name);

    return (
        <div className={cn("inline-block", className)}>
            <div className="relative">
                <select
                    {...field}
                    className="appearance-none px-5 py-2 pr-10 border border-gray-2 hover:bg-gray-2 text-gray-8 rounded-full body4_m focus:ring-1 focus:outline-none focus:ring-orange-500 transition-colors duration-200 cursor-pointer w-full"
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 12a.75.75 0 0 1-.53-.22l-4-4a.75.75 0 1 1 1.06-1.06L10 10.19l3.47-3.47a.75.75 0 1 1 1.06 1.06l-4 4A.75.75 0 0 1 10 12Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>

            {meta.touched && meta.error && (
                <p className="body5_r text-red-500 mt-2.5">{meta.error}</p>
            )}
        </div>
    );
}

export function TextArea({
    name,
    placeholder,
    limit,
    className,
}: {
    name: string;
    placeholder?: string;
    limit?: number;
    className?: string;
}) {
    const [field, meta, helpers] = useField(name);
    const length = field.value?.length || 0;

    return (
        <div className={cn("w-full", className)}>
            <textarea
                {...field}
                placeholder={placeholder}
                maxLength={limit}
                onChange={(e) => helpers.setValue(e.target.value)}
                className="w-full px-7 py-3 border border-gray-2 rounded-[10px] body5_r text-gray-8 focus:ring-1 focus:outline-none focus:ring-orange-500 transition-color duration-200"
            />
            <div className="flex justify-between items-center mt-2.5 w-full min-h-[1.25rem]">
                {meta.touched && meta.error ? (
                    <p className="body5_r text-red-500">{meta.error}</p>
                ) : (
                    <span />
                )}
                {limit !== undefined && (
                    <div className="text-gray-3 body5_r text-right">
                        {length}/{limit}
                    </div>
                )}
            </div>
        </div>
    );
}
