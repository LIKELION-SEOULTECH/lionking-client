import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";
import * as Yup from "yup";
import {
    FormSection,
    Input,
    TextArea,
    Select,
    RadioGroup,
} from "@/components/forms/common/FormComponents";

const FormikWrapper = ({
    children,
    initialValues = {},
    validationSchema = Yup.object(),
}: {
    children: React.ReactNode | ((props: any) => React.ReactNode);
    initialValues?: any;
    validationSchema?: any;
}) => (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={vi.fn()}>
        {(props) => (typeof children === "function" ? children(props) : children)}
    </Formik>
);

describe("FormSection Component", () => {
    it("renders with title and required indicator", () => {
        render(
            <FormSection title="Test Section" isRequired>
                <div>Content</div>
            </FormSection>
        );

        expect(screen.getByText("Test Section")).toBeInTheDocument();
    });

    it("renders description when provided", () => {
        render(
            <FormSection title="Test" description="Helper text">
                <div>Content</div>
            </FormSection>
        );

        expect(screen.getByText("Helper text")).toBeInTheDocument();
    });
});

describe("Input Component", () => {
    it("renders input with placeholder", () => {
        render(
            <FormikWrapper initialValues={{ testInput: "" }}>
                <Input name="testInput" placeholder="Enter text" />
            </FormikWrapper>
        );

        expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
    });

    it("handles input changes", async () => {
        const user = userEvent.setup();
        render(
            <FormikWrapper initialValues={{ testInput: "" }}>
                <Input name="testInput" placeholder="Enter text" />
            </FormikWrapper>
        );

        const input = screen.getByPlaceholderText("Enter text");
        await user.type(input, "Hello World");

        expect(input).toHaveValue("Hello World");
    });

    it("shows character limit", async () => {
        const user = userEvent.setup();
        render(
            <FormikWrapper initialValues={{ testInput: "" }}>
                <Input name="testInput" limit={10} />
            </FormikWrapper>
        );

        const input = screen.getByRole("textbox");
        await user.type(input, "Hello");

        expect(screen.getByText("5/10")).toBeInTheDocument();
    });

    it("displays validation error", async () => {
        const schema = Yup.object({
            email: Yup.string().email("Invalid email").required("Email required"),
        });

        render(
            <FormikWrapper initialValues={{ email: "" }} validationSchema={schema}>
                {({ errors, touched, setFieldTouched }) => (
                    <>
                        <Input name="email" />
                        <button onClick={() => setFieldTouched("email")}>Touch</button>
                    </>
                )}
            </FormikWrapper>
        );

        fireEvent.click(screen.getByText("Touch"));

        await waitFor(() => {
            expect(screen.getByText("Email required")).toBeInTheDocument();
        });
    });
});

describe("TextArea Component", () => {
    it("renders textarea with placeholder", () => {
        render(
            <FormikWrapper initialValues={{ description: "" }}>
                <TextArea name="description" placeholder="Enter description" />
            </FormikWrapper>
        );

        expect(screen.getByPlaceholderText("Enter description")).toBeInTheDocument();
    });

    it("handles text changes with character limit", async () => {
        const user = userEvent.setup();
        render(
            <FormikWrapper initialValues={{ description: "" }}>
                <TextArea name="description" limit={100} />
            </FormikWrapper>
        );

        const textarea = screen.getByRole("textbox");
        const testText = "This is a test description";
        await user.type(textarea, testText);

        expect(textarea).toHaveValue(testText);
        expect(screen.getByText(`${testText.length}/100`)).toBeInTheDocument();
    });
});

describe("Select Component", () => {
    const options = [
        { value: "", label: "Select option" },
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
    ];

    it("renders select with options", () => {
        render(
            <FormikWrapper initialValues={{ selectField: "" }}>
                <Select name="selectField" options={options} />
            </FormikWrapper>
        );

        const select = screen.getByRole("combobox");
        expect(select).toBeInTheDocument();
        expect(screen.getByText("Select option")).toBeInTheDocument();
    });

    it("handles selection change", async () => {
        const user = userEvent.setup();
        render(
            <FormikWrapper initialValues={{ selectField: "" }}>
                <Select name="selectField" options={options} />
            </FormikWrapper>
        );

        const select = screen.getByRole("combobox");
        await user.selectOptions(select, "option1");

        expect(select).toHaveValue("option1");
    });
});

describe("RadioGroup Component", () => {
    const options = [
        { label: "Option A", value: "a" },
        { label: "Option B", value: "b" },
        { label: "Option C", value: "c" },
    ];

    it("renders all radio options", () => {
        render(
            <FormikWrapper initialValues={{ radioField: "" }}>
                <RadioGroup name="radioField" options={options} />
            </FormikWrapper>
        );

        options.forEach((option) => {
            expect(screen.getByLabelText(option.label)).toBeInTheDocument();
        });
    });

    it("handles radio selection", async () => {
        const user = userEvent.setup();
        render(
            <FormikWrapper initialValues={{ radioField: "" }}>
                <RadioGroup name="radioField" options={options} />
            </FormikWrapper>
        );

        const optionB = screen.getByLabelText("Option B");
        await user.click(optionB);

        expect(optionB).toBeChecked();
        expect(screen.getByLabelText("Option A")).not.toBeChecked();
    });
});
