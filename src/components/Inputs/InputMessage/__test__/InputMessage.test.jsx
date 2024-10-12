import { fireEvent, render, screen } from "@testing-library/react";
import { it, vi, describe, expect } from "vitest";
import { userEvent } from "@testing-library/user-event";
import InputMessage from "../InputMessage";

describe("InputMessage Component", () => {
    it("renders the textarea with the correct value", () => {
        const mockSetValue = vi.fn();
        const value = "Hello";
        render(
            <InputMessage
                value={value}
                setValue={mockSetValue}
                submitButtonRef={{ current: null }}
            />
        );

        const textarea = screen.getByRole("textbox");
        expect(textarea).toBeInTheDocument();
        expect(textarea).toHaveValue(value);
    });

    it("calls setValue when the input value changes", async () => {
        const mockSetValue = vi.fn();
        render(
            <InputMessage
                value=""
                setValue={mockSetValue}
                submitButtonRef={{ current: null }}
            />
        );

        const user = userEvent.setup();
        const userInput = "test-message";

        const textarea = screen.getByRole("textbox");

        await user.click(textarea);
        await user.keyboard(userInput);

        for (const character of userInput) {
            expect(mockSetValue).toHaveBeenCalledWith(character);
        }
    });

    it("submits the form when enter is pressed without shift", async () => {
        const mockSetValue = vi.fn();
        const mockSubmitButtonClick = vi.fn();

        const submitButtonRef = { current: { click: mockSubmitButtonClick } };

        render(
            <InputMessage
                value=""
                setValue={mockSetValue}
                submitButtonRef={submitButtonRef}
            />
        );

        const textarea = screen.getByRole("textbox");

        fireEvent.keyDown(textarea, { keyCode: 13, shiftKey: false });

        expect(mockSubmitButtonClick).toHaveBeenCalled();
    });

    it("does not submit the form when Enter is pressed with Shift", () => {
        const mockSetValue = vi.fn();
        const mockSubmitButtonClick = vi.fn();

        const submitButtonRef = { current: { click: mockSubmitButtonClick } };

        render(
            <InputMessage
                value=""
                setValue={mockSetValue}
                submitButtonRef={submitButtonRef}
            />
        );

        // Simulate pressing Enter with Shift
        const textarea = screen.getByRole("textbox");
        fireEvent.keyDown(textarea, { keyCode: 13, shiftKey: true });

        // Ensure the submit button's click function is NOT called
        expect(mockSubmitButtonClick).not.toHaveBeenCalled();
    });

    it("passes additional props to the textarea element", () => {
        const mockSetValue = vi.fn();

        render(
            <InputMessage
                value=""
                setValue={mockSetValue}
                submitButtonRef={{ current: null }}
                placeholder="Type a message"
            />
        );

        // Check if the additional props like placeholder are passed correctly
        const textarea = screen.getByRole("textbox");
        expect(textarea).toHaveAttribute("placeholder", "Type a message");
    });
});
