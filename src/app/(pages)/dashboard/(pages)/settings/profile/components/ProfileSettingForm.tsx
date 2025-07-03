import { cn } from "@/lib/utils";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

function Input({
    name,
    className,
    ...props
}: {
    name: string;
    className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name">) {
    const [field, meta] = useField(name);

    return (
        <div className={cn(className)}>
            <input
                {...field}
                {...props}
                className="w-full px-7 py-3 border border-gray-5 rounded-[10px] body4_r text-gray-1 focus:ring-1 focus:outline-none focus:ring-orange-500 transition-color duration-200"
            />
            {meta.touched && meta.error && (
                <p className="text-sm text-red-500 mt-1">{meta.error}</p>
            )}
        </div>
    );
}

function RadioGroup({
    name,
    className,
    options,
}: {
    name: string;
    className?: string;
    options: { label: string; value: string }[];
}) {
    const [field, , helpers] = useField(name);

    return (
        <div className={cn("flex gap-12.5", className)}>
            {options.map((opt) => {
                const isChecked = field.value === opt.value;

                return (
                    <label key={opt.value} className="flex items-center gap-3.5 cursor-pointer">
                        <input
                            type="radio"
                            name={name}
                            value={opt.value}
                            checked={isChecked}
                            onChange={() => helpers.setValue(opt.value)}
                            className="hidden"
                        />
                        <div
                            className={`relative size-5.5 rounded-full transition-colors duration-200
                                ${isChecked ? "bg-white border border-orange-main" : "bg-gray-3"}`}
                        >
                            {isChecked && (
                                <div className="absolute top-1/2 left-1/2 size-3 bg-orange-main rounded-full -translate-x-1/2 -translate-y-1/2" />
                            )}
                        </div>
                        <span
                            className={`body4_m transition-colors duration-200 ${
                                isChecked ? "text-white" : "text-gray-3"
                            }`}
                        >
                            {opt.label}
                        </span>
                    </label>
                );
            })}
        </div>
    );
}

function Select({
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
        <div className={cn("relative inline-block", className)}>
            <select
                {...field}
                className="appearance-none px-5 py-2 pr-10 bg-gray-5 text-white rounded-full body4_r focus:ring-1 focus:outline-none focus:ring-orange-500 transition-colors duration-200 cursor-pointer"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-white">
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

            {meta.touched && meta.error && (
                <p className="text-sm text-red-500 mt-1">{meta.error}</p>
            )}
        </div>
    );
}

function TagSelector({ name, options }: { name: string; options: string[] }) {
    const [field, , helpers] = useField(name);
    const value: string[] = field.value || [];

    const toggle = (tag: string) => {
        if (value.includes(tag)) {
            helpers.setValue(value.filter((v) => v !== tag));
        } else {
            helpers.setValue([...value, tag]);
        }
    };

    return (
        <div className="flex flex-wrap gap-2">
            {options.map((tag) => (
                <button
                    type="button"
                    key={tag}
                    onClick={() => toggle(tag)}
                    className={`px-4 py-2 rounded-[8px] bg-gray-5 border-2 body4_r transition-colors duration-200 cursor-pointer ${
                        value.includes(tag)
                            ? "text-orange-main border-orange-500"
                            : "text-gray-1 border-gray-5"
                    }`}
                >
                    #{tag}
                </button>
            ))}
        </div>
    );
}

function TextArea({
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
                className="w-full px-7 py-3 border border-gray-5 rounded-[10px] body4_r text-white resize-none focus:ring-1 focus:outline-none focus:ring-orange-500 transition-color duration-200"
            />
            {limit !== undefined && (
                <div className="text-right text-gray-4 text-sm mt-1">
                    {length}/{limit} (공백 포함)
                </div>
            )}
            {meta.touched && meta.error && (
                <p className="text-sm text-red-500 mt-1">{meta.error}</p>
            )}
        </div>
    );
}

export const ProfileSettingForm = {
    Input,
    Select,
    RadioGroup,
    TagSelector,
    TextArea,
};
