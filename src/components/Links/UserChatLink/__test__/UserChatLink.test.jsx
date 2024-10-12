import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { UserContext } from "../../../../contexts";
import { getChatName } from "../../../../utils";
import UserChatLink from "../UserChatLink";
import { MemoryRouter } from "react-router-dom";

// Mock functions
vi.mock("../../../../utils", () => ({
    getChatName: vi.fn(),
}));

describe("UserChatLink Component", () => {
    const renderComponent = (userName = "current-user") => {
        render(
            <MemoryRouter>
                <UserContext.Provider
                    value={{ user: { userName: "current-user" } }}
                >
                    <UserChatLink userName={userName}>{userName}</UserChatLink>
                </UserContext.Provider>
            </MemoryRouter>
        );
    };

    it("renders children without wrapping in link if the current-user is same as the provided username", () => {
        const userName = "current-user";
        renderComponent(userName);

        expect(screen.getByText(userName)).toBeInTheDocument();
        expect(screen.queryByRole("link")).toBeNull();
    });

    it("renders a link to chat when the provided username is different from the current-user", () => {
        const userName = "other-user";
        getChatName.mockReturnValue(userName);
        renderComponent(userName);

        expect(screen.queryByRole("link")).toBeInTheDocument();
        expect(screen.getByRole("link")).toHaveAttribute(
            "href",
            `/home/${userName}`
        );
    });

    it("calls getChatName with correct arguments", () => {
        const userName = "other-user";
        getChatName.mockReturnValue(userName);
        renderComponent(userName);

        expect(getChatName).toHaveBeenCalledWith("current-user", userName);
    });
});
