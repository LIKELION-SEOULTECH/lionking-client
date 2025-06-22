import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        refresh: vi.fn(),
        prefetch: vi.fn(),
    }),
    useSearchParams: () => new URLSearchParams(),
}));

vi.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => {
        return (
            <img
                {...props}
                alt={props.alt || "Image"}
                style={{ width: props.width, height: props.height, objectFit: "cover" }}
            />
        );
    },
}));
