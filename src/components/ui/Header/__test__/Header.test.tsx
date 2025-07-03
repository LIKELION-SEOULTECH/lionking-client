import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

vi.mock("next/navigation", () => ({
    usePathname: () => "/about",
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
    }),
}));

test("Header renders correctly", () => {
    render(<Header />);
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeDefined();
});
