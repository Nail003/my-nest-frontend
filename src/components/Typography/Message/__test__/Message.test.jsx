import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UserContext } from "../../../../contexts";
import Message from "../Message";

// Mock components
vi.mock("../../../User", () => ({
    UserAvatar: ({ userName }) => <div>useravatar-{userName}</div>,
}));

vi.mock("../../../Links", () => ({
    UserChatLink: ({ children }) => <div>{children}</div>,
}));

// Mock styles
vi.mock("../Message.module.css", () => {
    const originalModule = vi.importActual("../Message.module.css");
    return { default: { ...originalModule, "message--user": "message--user" } };
});

describe("Message Component", () => {
    const mockUser = { user: { userName: "current-user" } };
    const renderComponent = (
        userName = "test-user",
        message = "test-message"
    ) => {
        render(
            <UserContext.Provider value={mockUser}>
                <Message {...{ userName, message }} />
            </UserContext.Provider>
        );
    };

    it("renders the message and username", () => {
        renderComponent();

        expect(screen.getByText("test-user")).toBeInTheDocument();
        expect(screen.getByText("useravatar-test-user")).toBeInTheDocument();
    });

    it("applies user message styles when the message is from current user", () => {
        renderComponent("current-user");

        expect(screen.getByTestId("message")).toHaveClass("message--user");
    });

    it("does not applies user message styles when the message is from some other user", () => {
        renderComponent();

        expect(screen.getByTestId("message")).not.toHaveClass("message--user");
    });
});
