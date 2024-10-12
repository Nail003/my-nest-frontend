import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LoaderCircle from "../LoaderCircle";

// Mock components
vi.mock("react-loader-spinner", () => ({
    ColorRing: () => <div>color-ring</div>,
}));

describe("LoaderCircle Component", () => {
    it("renders the ColorRing loader", () => {
        render(<LoaderCircle />);

        // Check if the ColorRing loader is rendered
        expect(screen.getByText("color-ring")).toBeInTheDocument();
    });

    it("passes additional props to the container div", () => {
        render(
            <LoaderCircle
                className="custom-class"
                data-testid="loader-container"
            />
        );

        // Check if the props are passed to the div
        const loaderContainer = screen.getByTestId("loader-container");
        expect(loaderContainer).toHaveClass("custom-class");
    });
});
