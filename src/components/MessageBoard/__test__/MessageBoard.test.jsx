import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MessageBoard from "../MessageBoard";

// Mock components
vi.mock("../../Containers", () => ({
    MessagesContainer: () => <div>messages-container</div>,
}));

vi.mock("../../Forms", () => ({
    MessageForm: () => <div>message-form</div>,
}));

describe("MessageBoard Component", () => {
    it("renders MessagesContainer component", () => {
        render(<MessageBoard />);

        expect(screen.getByText("messages-container")).toBeInTheDocument();
    });

    it("renders MessageForm component", () => {
        render(<MessageBoard />);

        expect(screen.getByText("message-form")).toBeInTheDocument();
    });
});
