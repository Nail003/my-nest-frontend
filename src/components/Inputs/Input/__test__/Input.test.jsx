import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { userEvent } from "@testing-library/user-event";
import Input from "../Input";

describe("Input Component", () => {
    const renderComponenet = (label = "Username", mockSetValue = vi.fn()) => {
        render(<Input label={label} setValue={mockSetValue} />);
    };

    it("renders the input field with label", () => {
        const label = "Username";
        renderComponenet(label);

        expect(screen.getByLabelText(label)).toBeInTheDocument();
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("sets the input id and name base on label", () => {
        const label = "Username";
        renderComponenet(label);

        const input = screen.getByLabelText(label);
        expect(input).toHaveAttribute("id", "username");
        expect(input).toHaveAttribute("name", "username");
    });

    it("calls set value on input change", async () => {
        const label = "Username";
        const mockSetValue = vi.fn();
        renderComponenet(label, mockSetValue);

        const user = userEvent.setup();

        const input = screen.getByLabelText(label);
        const userInput = "test-user-name";

        await user.click(input);
        await user.keyboard(userInput);

        expect(mockSetValue).toHaveBeenCalledWith(userInput);
    });

    it("passes additional props to the input element", () => {
        const label = "Username";
        const placeholderText = "Enter your username";
        render(<Input label={label} placeholder={placeholderText} />);

        const input = screen.getByLabelText(label);

        expect(input).toHaveAttribute("placeholder", placeholderText);
    });
});
