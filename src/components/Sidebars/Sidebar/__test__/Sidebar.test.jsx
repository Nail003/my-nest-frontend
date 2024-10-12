import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Sidebar from "../Sidebar";
import { AppContext } from "../../../../contexts";

vi.mock("../Sidebar.module.css", () => {
    const originalModule = vi.importActual("../Sidebar.module.css");
    return {
        default: {
            ...originalModule,
            expand: "expand-styles",
            collapse: "collapse-styles",
        },
    };
});

describe("Sidebar Component", () => {
    const renderComponent = (displaySidebar = true, children) => {
        render(
            <AppContext.Provider value={{ displaySidebar }}>
                <Sidebar>{children}</Sidebar>
            </AppContext.Provider>
        );
    };

    it("renders children correctly", () => {
        renderComponent(true, <div>children</div>);

        expect(screen.getByText("children")).toBeInTheDocument();
    });

    it("applies the expand class when displaySidebar is true", () => {
        renderComponent();

        const sidebar = screen.getByTestId("sidebar");

        expect(sidebar).toHaveClass("expand-styles");
        expect(sidebar).not.toHaveClass("collapse-styles");
    });

    it("applies the collapse class when displaySidebar is false", () => {
        renderComponent(false);

        const sidebar = screen.getByTestId("sidebar");

        expect(sidebar).toHaveClass("collapse-styles");
        expect(sidebar).not.toHaveClass("expand-styles");
    });
});
