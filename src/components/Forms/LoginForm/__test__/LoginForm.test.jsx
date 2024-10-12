import { afterEach, beforeEach, describe, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { createContext } from "react";
import userEvent from "@testing-library/user-event";
import { UserContext } from "../../../../contexts";
import { useCredentialFormStates } from "../../../../hooks";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { LoginForm } from "../..";
import { getUser } from "../../../../services/user";

// Mock context
vi.mock("../../../../contexts", () => {
    return { UserContext: createContext() };
});

// Mock hooks
vi.mock("../../../../hooks", () => {
    return { useCredentialFormStates: vi.fn() };
});

vi.mock("react-router-dom", async () => {
    const originalModule = await vi.importActual("react-router-dom");
    return {
        ...originalModule,
        useNavigate: vi.fn(),
    };
});

// Mock services
vi.mock("../../../../services/user", () => {
    return { getUser: vi.fn() };
});

describe("LoginForm", () => {
    const mockStats = {
        userName: "test-user",
        password: "test-password",
        response: "",
        loading: false,
        setUserName: vi.fn(),
        setPassword: vi.fn(),
        setResponse: vi.fn(),
        setLoading: vi.fn(),
    };

    const mockNavigate = vi.fn();
    const mockSetUser = vi.fn();

    const renderComponent = () => {
        return render(
            <MemoryRouter>
                <UserContext.Provider value={{ setUser: mockSetUser }}>
                    <LoginForm />
                </UserContext.Provider>
            </MemoryRouter>
        );
    };

    beforeEach(() => {
        useCredentialFormStates.mockReturnValue(mockStats);
        useNavigate.mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it("renders the form and its elements correctly", () => {
        renderComponent();

        expect(screen.getByText("LOGIN")).toBeInTheDocument();
        expect(screen.getByLabelText("UserName")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /login/i })
        ).toBeInTheDocument();
        expect(screen.getByText("Click here to")).toBeInTheDocument();
    });

    it("handles loading and response of form submission correctly", async () => {
        const user = userEvent.setup();

        renderComponent();

        await simulateUserInput(user);

        await waitFor(() => {
            expect(getUser).toHaveBeenCalledWith(
                mockStats.userName,
                mockStats.password
            );
            expect(mockStats.setResponse).toHaveBeenCalledWith("");
            expect(mockStats.setLoading).toHaveBeenCalledWith(true);
            expect(mockStats.setLoading).toHaveBeenCalledWith(false);
        });
    });

    it("handles successfull submission correctly", async () => {
        getUser.mockReturnValue({ ok: true, accessToken: "fakeAccessToken" });
        const user = userEvent.setup();

        renderComponent();

        await simulateUserInput(user);

        await waitFor(() => {
            expect(mockSetUser).toHaveBeenCalledWith({
                userName: mockStats.userName,
                isLoggedIn: true,
            });
            expect(localStorage.getItem("accessToken")).toBe("fakeAccessToken");
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });

    it("handles wrong form submission correctly", async () => {
        getUser.mockReturnValue({ ok: false });
        const user = userEvent.setup();

        renderComponent();

        await simulateUserInput(user);

        await waitFor(() => {
            expect(mockStats.setResponse).toHaveBeenCalledWith({ ok: false });
        });
    });

    it("logs network error during form submission", async () => {
        const consoleErrorSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});
        getUser.mockRejectedValue(new Error("Network error"));
        const user = userEvent.setup();

        renderComponent();

        await simulateUserInput(user);

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                new Error("Network error")
            );
        });

        consoleErrorSpy.mockRestore();
    });
});

async function simulateUserInput(user, userName = "admin", password = "admin") {
    const userNameField = screen.getByLabelText("UserName");
    const passwordField = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    await user.click(userNameField);
    await user.keyboard(userName);
    await user.click(passwordField);
    await user.keyboard(password);
    await user.click(loginButton);
}
