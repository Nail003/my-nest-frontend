import { render } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { UserContext } from "../../../contexts";
import LoginChecker from "../LoginChecker";

// Mock hooks
vi.mock("react-router-dom", async () => {
    const originalModule = await vi.importActual("react-router-dom");
    return { ...originalModule, useNavigate: vi.fn() };
});

describe("LoginChecker Component", () => {
    const mockNavigate = vi.fn();

    const renderComponent = (isLoggedIn = true) => {
        useNavigate.mockReturnValue(mockNavigate);

        render(
            <MemoryRouter>
                <UserContext.Provider value={{ user: { isLoggedIn } }}>
                    <LoginChecker />
                </UserContext.Provider>
            </MemoryRouter>
        );
    };

    afterEach(() => {
        vi.resetAllMocks();
    });

    it("navigates to the home page if the user is not logged in", () => {
        renderComponent(false);

        expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("does not navigate if the user is logged in", () => {
        renderComponent();

        expect(mockNavigate).not.toHaveBeenCalled();
    });
});
