import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getUserChats } from "../../../services/user";
import Inbox from "../Inbox";

// Mock services
vi.mock("../../../services/user", () => ({
    getUserChats: vi.fn(),
}));

// Mock components
vi.mock("../../Banners", () => ({
    EmptyChatBanner: ({ text }) => <div>{text}</div>,
}));

vi.mock("../../Elements", () => ({
    InboxElement: ({ chatName }) => (
        <div>{chatName ? chatName : "inbox-element"}</div>
    ),
}));

vi.mock("../../Loaders", () => ({
    LoadingScreen: () => <div>loading-screen</div>,
}));

vi.mock("../../Sidebars", () => ({
    Sidebar: ({ children }) => <div>{children}</div>,
}));

describe("Inbox Component", () => {
    it("stops loading once the chats are loaded", async () => {
        getUserChats.mockReturnValue({ chats: [], ok: false });

        render(<Inbox />);

        await waitFor(() => {
            expect(screen.queryByText("loading-screen")).toBeNull();
        });
    });

    it("renders the loading screen initially", async () => {
        getUserChats.mockReturnValue({ chats: [], ok: false });

        render(<Inbox />);

        expect(screen.getByText("loading-screen")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText("loading-screen")).toBeNull();
        });
    });

    it("displays empty chat banner when no chats are present", async () => {
        getUserChats.mockReturnValue({ chats: [], ok: false });

        render(<Inbox />);

        await waitFor(() => {
            expect(screen.getByText(/click on name/i)).toBeInTheDocument();
        });
    });

    it("displays user chats when available", async () => {
        const mockedChats = ["chat 1", "chat 2", "chat 3"];
        getUserChats.mockReturnValue({
            chats: mockedChats,
            ok: true,
        });

        render(<Inbox />);

        await waitFor(() => {
            mockedChats.forEach((chatName) => {
                expect(screen.getByText(chatName)).toBeInTheDocument();
            });
        });
    });
});
