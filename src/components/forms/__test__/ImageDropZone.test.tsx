import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";
import * as Yup from "yup";
import ImageDropZone from "@/components/forms/common/ImageDropZone";

const createMockFile = (name: string, size = 1024, type = "image/jpeg"): File => {
    const file = new File(["a".repeat(size)], name, { type });
    Object.defineProperty(file, "size", { value: size });
    return file;
};

const createDataURL = (content: string) => `data:image/jpeg;base64,${btoa(content)}`;

class MockFileReader {
    result: string | ArrayBuffer | null = null;
    readAsDataURL(file: File) {
        setTimeout(() => {
            this.result = createDataURL(file.name);
            if (this.onload) {
                this.onload({ target: { result: this.result } } as any);
            }
        }, 0);
    }
    onload: ((event: any) => void) | null = null;
}

const originalFileReader = global.FileReader;
beforeEach(() => {
    global.FileReader = MockFileReader as any;
});
afterEach(() => {
    global.FileReader = originalFileReader;
});

const FormWrapper = ({
    children,
    initialValues = {},
    validationSchema = Yup.object(),
}: {
    children: React.ReactNode;
    initialValues?: any;
    validationSchema?: any;
}) => (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={vi.fn()}>
        {typeof children === "function" ? children : () => children}
    </Formik>
);

describe("ImageDropZone Component", () => {
    describe("Basic Functionality", () => {
        it("renders dropzone with upload instructions", () => {
            render(
                <FormWrapper initialValues={{ image: "" }}>
                    <ImageDropZone name="image" />
                </FormWrapper>
            );
            expect(screen.getByText("컴퓨터에서 업로드")).toBeInTheDocument();
            expect(screen.getByTestId("dropzone")).toBeInTheDocument();
        });

        it("handles single file upload", async () => {
            render(
                <FormWrapper initialValues={{ image: "" }}>
                    <ImageDropZone name="image" multiple={false} />
                </FormWrapper>
            );
            const file = createMockFile("test.jpg");
            const input = screen
                .getByRole("button", { name: /컴퓨터에서 업로드/i })
                .parentElement?.querySelector('input[type="file"]');
            fireEvent.change(input!, { target: { files: [file] } });
            await waitFor(() => {
                expect(screen.getByAltText("Preview 1")).toBeInTheDocument();
            });
        });

        it("handles multiple file upload", async () => {
            render(
                <FormWrapper initialValues={{ images: [] }}>
                    <ImageDropZone name="images" multiple={true} maxFiles={5} />
                </FormWrapper>
            );
            const files = [
                createMockFile("test1.jpg"),
                createMockFile("test2.jpg"),
                createMockFile("test3.jpg"),
            ];
            const input = screen
                .getByRole("button", { name: /컴퓨터에서 업로드/i })
                .parentElement?.querySelector('input[type="file"]');
            fireEvent.change(input!, { target: { files } });
            await waitFor(() => {
                expect(screen.getByText("3/5개 업로드됨")).toBeInTheDocument();
                expect(screen.getAllByAltText(/Preview/)).toHaveLength(3);
            });
        });

        it("respects maxFiles limit", async () => {
            render(
                <FormWrapper initialValues={{ images: ["existing1.jpg", "existing2.jpg"] }}>
                    <ImageDropZone name="images" multiple={true} maxFiles={3} />
                </FormWrapper>
            );
            expect(screen.getByText("2/3개 업로드됨")).toBeInTheDocument();
            const files = [createMockFile("test3.jpg"), createMockFile("test4.jpg")];
            const input = screen
                .getByRole("button", { name: /컴퓨터에서 업로드/i })
                .parentElement?.querySelector('input[type="file"]');
            fireEvent.change(input!, { target: { files } });
            await waitFor(() => {
                expect(screen.getAllByAltText(/Preview/)).toHaveLength(3);
            });
            expect(screen.queryByTestId("dropzone")).not.toBeInTheDocument();
        });
    });

    describe("Drag and Drop", () => {
        it("handles file drop", async () => {
            render(
                <FormWrapper initialValues={{ image: "" }}>
                    <ImageDropZone name="image" />
                </FormWrapper>
            );
            const dropzone = screen.getByTestId("dropzone");
            const file = createMockFile("dropped.jpg");
            fireEvent.dragOver(dropzone);
            expect(dropzone).toHaveClass("border-orange-main", "bg-orange-light-1");
            fireEvent.drop(dropzone, { dataTransfer: { files: [file], types: ["Files"] } });
            await waitFor(() => {
                expect(screen.getByAltText("Preview 1")).toBeInTheDocument();
            });
        });

        it("ignores non-image files", async () => {
            render(
                <FormWrapper initialValues={{ images: [] }}>
                    <ImageDropZone name="images" multiple={true} />
                </FormWrapper>
            );
            const files = [
                createMockFile("image.jpg", 1024, "image/jpeg"),
                createMockFile("document.pdf", 1024, "application/pdf"),
                createMockFile("text.txt", 1024, "text/plain"),
            ];
            const dropzone = screen.getByTestId("dropzone");
            fireEvent.drop(dropzone, { dataTransfer: { files, types: ["Files"] } });
            await waitFor(() => {
                expect(screen.getAllByAltText(/Preview/)).toHaveLength(1);
            });
        });
    });

    describe("Layout Modes", () => {
        it("shows layout toggle for multiple images", () => {
            render(
                <FormWrapper
                    initialValues={{ images: [createDataURL("img1"), createDataURL("img2")] }}
                >
                    <ImageDropZone name="images" multiple={true} />
                </FormWrapper>
            );
            expect(screen.getByTitle("Grid view")).toBeInTheDocument();
            expect(screen.getByTitle("Full width view")).toBeInTheDocument();
        });

        it("switches between grid and full layout", async () => {
            const user = userEvent.setup();
            render(
                <FormWrapper
                    initialValues={{ images: [createDataURL("img1"), createDataURL("img2")] }}
                >
                    <ImageDropZone name="images" multiple={true} defaultLayout="grid" />
                </FormWrapper>
            );
            const gridContainer = screen.getByRole("img", { name: "Preview 1" }).closest(".grid");
            expect(gridContainer).toHaveClass("grid-cols-2");
            await user.click(screen.getByTitle("Full width view"));
            const fullContainer = screen
                .getByRole("img", { name: "Preview 1" })
                .closest(".flex-col");
            expect(fullContainer).toBeInTheDocument();
        });

        it("hides layout toggle for single image", () => {
            render(
                <FormWrapper initialValues={{ images: [createDataURL("img1")] }}>
                    <ImageDropZone name="images" multiple={true} />
                </FormWrapper>
            );
            expect(screen.queryByTitle("Grid view")).not.toBeInTheDocument();
            expect(screen.queryByTitle("Full width view")).not.toBeInTheDocument();
        });
    });

    describe("Image Removal", () => {
        it("removes image on click", async () => {
            const user = userEvent.setup();
            render(
                <FormWrapper
                    initialValues={{ images: [createDataURL("img1"), createDataURL("img2")] }}
                >
                    <ImageDropZone name="images" multiple={true} />
                </FormWrapper>
            );
            expect(screen.getAllByAltText(/Preview/)).toHaveLength(2);
            const imageContainer = screen
                .getByAltText("Preview 1")
                .closest(".group") as HTMLElement;
            fireEvent.mouseEnter(imageContainer);
            const removeButton = within(imageContainer).getByRole("button");
            await user.click(removeButton);
            await waitFor(() => {
                expect(screen.getAllByAltText(/Preview/)).toHaveLength(1);
            });
        });

        it("clears single image", async () => {
            const user = userEvent.setup();
            render(
                <FormWrapper initialValues={{ image: createDataURL("img1") }}>
                    <ImageDropZone name="image" multiple={false} />
                </FormWrapper>
            );
            expect(screen.getByAltText("Preview 1")).toBeInTheDocument();
            const imageContainer = screen
                .getByAltText("Preview 1")
                .closest(".group") as HTMLElement;
            fireEvent.mouseEnter(imageContainer);
            const removeButton = within(imageContainer).getByRole("button");
            await user.click(removeButton);
            await waitFor(() => {
                expect(screen.getByTestId("dropzone")).toBeInTheDocument();
            });
        });
    });
});
