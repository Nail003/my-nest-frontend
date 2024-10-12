import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import SignupForm from "../SignupForm";
import { createUser } from "../../../../services/user";
import { avatars } from "../../../../assets/avatars";
import { useCredentialFormStates } from "../../../../hooks";
import { MemoryRouter } from "react-router-dom";

// Mocking dependencies
vi.mock("../../../../services/user", () => ({
    createUser: vi.fn(),
}));

vi.mock("../../../../hooks", () => ({
    useCredentialFormStates: vi.fn(),
}));

vi.mock("../../../../assets/avatars", () => ({
    avatars: ["avatar1", "avatar2"],
}));

describe("SignupForm Component", () => {
    const mockSetUserName = vi.fn();
    const mockSetPassword = vi.fn();
    const mockSetResponse = vi.fn();
    const mockSetLoading = vi.fn();

    const mockStates = {
        userName: "testUser",
        password: "testPassword",
        response: null,
        loading: false,
        setUserName: mockSetUserName,
        setPassword: mockSetPassword,
        setResponse: mockSetResponse,
        setLoading: mockSetLoading,
    };

    beforeEach(() => {
        useCredentialFormStates.mockReturnValue(mockStates);

        render(
            <MemoryRouter>
                <SignupForm />
            </MemoryRouter>
        );
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders correctly", () => {
        expect(screen.getByTestId("form")).toBeInTheDocument();
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /sign up/i })
        ).toBeInTheDocument();
        expect(screen.getByText(/Click here to/i)).toBeInTheDocument();
    });

    it("updates state on input change", () => {
        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: "newUser" },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: "newPassword" },
        });

        expect(mockSetUserName).toHaveBeenCalledWith("newUser");
        expect(mockSetPassword).toHaveBeenCalledWith("newPassword");
    });

    it("submits the form and calls createUser", async () => {
        fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

        await waitFor(() => {
            expect(mockSetLoading).toHaveBeenCalledWith(true);
            expect(createUser).toHaveBeenCalledWith(
                "testUser",
                "testPassword",
                avatars[0]
            );
            expect(mockSetLoading).toHaveBeenCalledWith(false);
        });
    });

    it("handles API errors and logs them", async () => {
        const consoleErrorSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});
        createUser.mockRejectedValueOnce(new Error("API Error"));

        fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                new Error("API Error")
            );
            expect(mockSetResponse).toHaveBeenCalledWith(null);
            expect(mockSetLoading).toHaveBeenCalledWith(false);
        });

        consoleErrorSpy.mockRestore();
    });
});
