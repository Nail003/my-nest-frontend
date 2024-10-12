import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ButtonMenu from "../ButtonMenu";
import { AppContext } from "../../../../contexts";

// Mock the AppContext
const mockToggleSidebar = vi.fn();

const renderWithContext = (displaySidebar) => {
    return render(
        <AppContext.Provider
            value={{ displaySidebar, toggleSidebar: mockToggleSidebar }}
        >
            <ButtonMenu />
        </AppContext.Provider>
    );
};

// Mock the CSS module
vi.mock("../ButtonMenu.module.css", () => ({
    default: {
        "button-menu": "button-menu",
        bar1: "bar1",
        bar2: "bar2",
        bar3: "bar3",
        change: "change",
    },
}));

describe("ButtonMenu", () => {
    it("renders correctly", () => {
        renderWithContext(false);

        // Check if all bars are rendered
        expect(screen.getByTestId("bar1")).toBeInTheDocument();
        expect(screen.getByTestId("bar2")).toBeInTheDocument();
        expect(screen.getByTestId("bar3")).toBeInTheDocument();
    });

    it("applies the 'change' class when displaySidebar is true", () => {
        renderWithContext(true);

        // Check if all bars have the 'change' class when displaySidebar is true
        expect(screen.getByTestId("bar1")).toHaveClass("change");
        expect(screen.getByTestId("bar2")).toHaveClass("change");
        expect(screen.getByTestId("bar3")).toHaveClass("change");
    });

    it("does not apply the 'change' class when displaySidebar is false", () => {
        renderWithContext(false);

        // Check if all bars do not have the 'change' class when displaySidebar is false
        expect(screen.getByTestId("bar1")).not.toHaveClass("change");
        expect(screen.getByTestId("bar2")).not.toHaveClass("change");
        expect(screen.getByTestId("bar3")).not.toHaveClass("change");
    });

    it("calls toggleSidebar when the button is clicked", () => {
        renderWithContext(false);

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
    });
});
