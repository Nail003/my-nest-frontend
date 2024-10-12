import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "../Header";
import { AppContext, UserContext } from "../../../contexts";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import { userEvent } from "@testing-library/user-event";

// Mock hooks
vi.mock("react-router-dom", async () => {
    const originalModule = await vi.importActual("react-router-dom");
    return { ...originalModule, useNavigate: vi.fn() };
});

vi.mock("@react-hook/media-query", () => ({
    useMediaQuery: vi.fn(),
}));

// Mock components
vi.mock("../../User", () => ({
    UserAvatar: ({ userName }) => <div>{userName}</div>,
}));

vi.mock("../../Buttons", async () => {
    const originalModule = await vi.importActual("../../Buttons");
    return {
        ...originalModule,
        ButtonMenu: () => <button>menu-button</button>,
    };
});

describe("Header Component", () => {
    const mockOpenSideBar = vi.fn();
    const mockNavigate = vi.fn();

    const renderComponent = (
        user = { userName: "John Doe", isLoggedIn: true },
        isMobile = false
    ) => {
        useMediaQuery.mockReturnValue(isMobile);
        useNavigate.mockReturnValue(mockNavigate);

        render(
            <MemoryRouter>
                <AppContext.Provider value={{ openSidebar: mockOpenSideBar }}>
                    <UserContext.Provider value={{ user }}>
                        <Header />
                    </UserContext.Provider>
                </AppContext.Provider>
            </MemoryRouter>
        );
    };

    it("renders the title", () => {
        renderComponent();
        expect(screen.getByText("My Nest")).toBeInTheDocument();
    });

    it("shows the UserAvatar and Logout button when user is logged in", () => {
        renderComponent();
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Logout")).toBeInTheDocument();
    });

    it("does not show UserAvatar and Logout button when user is logged out", () => {
        renderComponent({ isLoggedIn: false });
        expect(screen.queryByText("John Doe")).toBeNull();
        expect(screen.queryByText("Logout")).toBeNull();
    });

    it("shows the mobile menu button on mobile devices", () => {
        renderComponent(undefined, true); // Simulating mobile device
        expect(
            screen.getByRole("button", { name: "menu-button" })
        ).toBeInTheDocument();
    });

    it("calls handleLoggoutButton on loggout click", async () => {
        renderComponent();

        const loggoutButton = screen.getByText("Logout");

        const user = userEvent.setup();

        await user.click(loggoutButton);

        // localStorage has no jwt
        expect(localStorage.getItem("accessToken")).toBeNull();

        // Check if openSidebar and navigate were called
        expect(mockOpenSideBar).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});
