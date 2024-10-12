import { beforeEach, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext, UserContext } from "../../../../contexts";
import InboxElement from "../InboxElement";
import { globe } from "../../../../assets/imgs";
import { useMediaQuery } from "@react-hook/media-query";
import userEvent from "@testing-library/user-event";

// Mock CSS styles
vi.mock("../InboxElement.module.css", () => {
    return { default: { "inbox-element--active": "active-button-styles" } };
});

// Mock child components
vi.mock("../../../User", () => {
    return { UserAvatar: ({ userName }) => <div>UserAvatar:{userName}</div> };
});

vi.mock("../../../Images", () => {
    return { ImgAvatar: ({ src }) => <div>{src}</div> };
});

// Mock Context
vi.mock("../../../../contexts", () => {
    return { AppContext: createContext(), UserContext: createContext() };
});

// Mock hooks
vi.mock("react-router-dom", () => {
    return { useNavigate: vi.fn(), useParams: vi.fn() };
});

vi.mock("@react-hook/media-query", () => {
    return { useMediaQuery: vi.fn() };
});

describe("InboxElement", () => {
    const mockNavigate = vi.fn();
    const mockCloseSidebar = vi.fn();

    const renderComponenet = (chatName, avatar) => {
        return render(
            <AppContext.Provider value={{ closeSidebar: mockCloseSidebar }}>
                <UserContext.Provider value={{ user: { userName: "user1" } }}>
                    <InboxElement {...{ chatName, avatar }} />
                </UserContext.Provider>
            </AppContext.Provider>
        );
    };

    beforeEach(() => {
        vi.resetAllMocks();

        useNavigate.mockReturnValue(mockNavigate);
        useParams.mockReturnValue({ chatName: "user1 user2" });
        useMediaQuery.mockReturnValue(false);
    });

    it("renders global chat by default", () => {
        renderComponenet();

        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByText(globe)).toBeInTheDocument();
        expect(screen.getByText("Global Chat")).toBeInTheDocument();
    });

    it("passes avatar prop correctly to ImgAvatar", () => {
        renderComponenet(undefined, "custom-avatar");

        expect(screen.getByText("custom-avatar")).toBeInTheDocument();
    });

    it("renders UserAvatar with correct userName if the chat in not global chat", () => {
        renderComponenet("user1 user2");

        expect(screen.getByText("UserAvatar:user2")).toBeInTheDocument();
        expect(screen.getByRole("heading").textContent).toBe("user2");
    });

    it("renders InboxElement with active button class if it is active", () => {
        renderComponenet("user1 user2");

        const InboxElement = screen.getByRole("button");

        expect(InboxElement).toHaveClass("active-button-styles");
    });

    it("navigates to correct url when InboxElement is clicked", async () => {
        const user = userEvent.setup();

        renderComponenet("user1 user2");

        const InboxElement = screen.getByRole("button");

        await user.click(InboxElement);

        expect(mockNavigate).toHaveBeenCalledWith("/home/user1 user2");
    });

    it("does not close sidebar on desktop when InboxElement is clicked", async () => {
        const user = userEvent.setup();

        renderComponenet();

        const InboxElement = screen.getByRole("button");

        await user.click(InboxElement);

        expect(mockCloseSidebar).not.toHaveBeenCalled();
    });

    it("closes sidebar on mobile when InboxElement is clicked", async () => {
        useMediaQuery.mockReturnValue(true);
        const user = userEvent.setup();

        renderComponenet();

        const InboxElement = screen.getByRole("button");

        await user.click(InboxElement);

        expect(mockCloseSidebar).toHaveBeenCalled();
    });
});
