import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { createContext } from "react";
import userEvent from "@testing-library/user-event";
import { UserContext } from "../../../../contexts";
import { useNavigate, useParams } from "react-router-dom";
import { MessageForm } from "../..";
import { sendMessage } from "../../../../services/messages";

// Mock context
vi.mock("../../../../contexts", () => {
    return { UserContext: createContext() };
});

// Mock hooks
vi.mock("react-router-dom", () => {
    return {
        useParams: vi.fn(),
        useNavigate: vi.fn(),
    };
});

// Mock services

vi.mock("../../../../services/messages", () => {
    return { sendMessage: vi.fn() };
});

describe("MessageForm", () => {
    const mockUser = { isLoggedIn: true };

    const renderComponent = () => {
        return render(
            <UserContext.Provider value={{ user: mockUser }}>
                <MessageForm />
            </UserContext.Provider>
        );
    };

    const simulateUserInput = async (user) => {
        const textArea = screen.getByRole("textbox");
        const sendMessageButton = screen.getByRole("button", { name: /send/i });

        await user.click(textArea);
        await user.keyboard("test-message");
        await user.click(sendMessageButton);
    };

    const mockNavigate = vi.fn();

    beforeEach(() => {
        useParams.mockReturnValue({ chatName: "test-chat" });
        useNavigate.mockReturnValue(mockNavigate);
        mockUser.isLoggedIn = true;
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it("renders form and its elements correctly", () => {
        renderComponent();

        expect(screen.getByRole("textbox")).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /send/i })
        ).toBeInTheDocument();
    });

    it("resets textArea after each submission", async () => {
        const user = userEvent.setup();

        renderComponent();

        await simulateUserInput(user);

        await waitFor(() => {
            expect(screen.getByRole("textbox").value).toBe("");
        });
    });

    it("sends the message correctly if user is loggdin", async () => {
        const user = userEvent.setup();

        renderComponent();

        await simulateUserInput(user);

        await waitFor(() => {
            expect(sendMessage).toHaveBeenCalledWith(
                "test-message",
                "test-chat"
            );
        });
    });

    it("navigate the user to home page if a loggedout user tries to submit the message -edge_case", async () => {
        mockUser.isLoggedIn = false;
        const user = userEvent.setup();

        renderComponent();

        await simulateUserInput(user);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });

    it("logs network error occured during message submission to console", async () => {
        const user = userEvent.setup();
        const consoleErrorSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});

        sendMessage.mockImplementationOnce(() => {
            throw new Error("Network Error");
        });

        renderComponent();

        await simulateUserInput(user);

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalled();
        });

        consoleErrorSpy.mockRestore();
    });
});
