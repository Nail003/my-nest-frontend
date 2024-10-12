import {
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, vi } from "vitest";
import MessagesContainer from "../MessagesContainer";
import { useParams } from "react-router-dom";
import { getMessages } from "../../../../services/messages";

// Mock child components
vi.mock("../../../Loaders", () => {
    return {
        LoadingScreen: () => <div>LoadingScreen</div>,
    };
});

vi.mock("../../../Banners", () => {
    return { EmptyChatBanner: () => <div>EmptyChatBanner</div> };
});

vi.mock("../../../Typography", () => {
    return {
        Message: ({ message, userName }) => (
            <>
                <div>
                    {userName}:{message}
                </div>
            </>
        ),
    };
});

// Mock hooks and services
vi.mock("react-router-dom", () => {
    return { useParams: vi.fn() };
});

vi.mock("../../../../services/messages", () => {
    return { getMessages: vi.fn() };
});

describe("MessagesContainer", () => {
    beforeEach(() => {
        useParams.mockReturnValue({ chatName: "testChat" });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("initially renders loading screen", async () => {
        getMessages.mockResolvedValueOnce({ ok: true, messages: [] });

        render(<MessagesContainer />);

        expect(screen.getByText("LoadingScreen")).toBeInTheDocument();

        await waitForElementToBeRemoved(screen.getByText("LoadingScreen"));
    });

    it("renders EmptyChatBanner when there are no messages", async () => {
        getMessages.mockResolvedValueOnce({ ok: true, messages: [] });

        render(<MessagesContainer />);

        await waitFor(() => {
            expect(screen.getByText("EmptyChatBanner")).toBeInTheDocument();
        });
    });

    it("renders Message when there are messages", async () => {
        const mockedMessages = [
            { _id: 1, userName: "user1", message: "hello1" },
            { _id: 2, userName: "user2", message: "hello2" },
        ];

        getMessages.mockResolvedValueOnce({
            ok: true,
            messages: mockedMessages,
        });

        render(<MessagesContainer />);

        await waitFor(() => {
            expect(screen.getByText("user1:hello1")).toBeInTheDocument();
            expect(screen.getByText("user2:hello2")).toBeInTheDocument();
        });
    });

    it("logs an error when message fetching fails", async () => {
        const consoleErrorSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});

        getMessages.mockRejectedValue(new Error("Network Error"));

        render(<MessagesContainer />);

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                new Error("Network Error")
            );
        });

        consoleErrorSpy.mockRestore();
    });
});
