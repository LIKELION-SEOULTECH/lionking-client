import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

test("Header renders correctly", () => {
    render(<Header />);
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeDefined();
});
