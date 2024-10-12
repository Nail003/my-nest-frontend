import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FormMessage from "../FormMessage";

vi.mock("../FormMessage.module.css", () => {
    const originalModule = vi.importActual("../FormMessage.module.css");
    return {
        default: {
            ...originalModule,
            "form-message--success": "form-message--success",
            "form-message--visible": "form-message--visible",
        },
    };
});

describe("FormMessage Component", () => {
    const renderComponent = (response = { ok: false }) => {
        render(<FormMessage response={response} />);
    };

    it("renders the message when the response has a message", () => {
        const mockResponse = {
            message: "test success message",
            ok: true,
        };
        renderComponent(mockResponse);

        expect(screen.getByText(mockResponse.message)).toBeInTheDocument();
    });

    it("renders the message with correct visible class when the response has message", () => {
        const mockResponse = {
            message: "test success message",
            ok: true,
        };
        renderComponent(mockResponse);

        const message = screen.getByText(mockResponse.message);
        expect(message).toHaveClass("form-message--visible");
    });

    it("renders the message with success class if response is ok", () => {
        const mockResponse = {
            message: "test success message",
            ok: true,
        };
        renderComponent(mockResponse);

        expect(screen.getByText(mockResponse.message)).toHaveClass(
            "form-message--success"
        );
    });

    it("renders the message with no success class if response is not ok", () => {
        const mockResponse = {
            message: "test success message",
            ok: false,
        };
        renderComponent(mockResponse);

        expect(screen.getByText(mockResponse.message)).not.toHaveClass(
            "form-message--success"
        );
    });

    it("hide the message if there is no message in response", () => {
        renderComponent();

        const message = screen.getByRole("paragraph");

        expect(message).not.toHaveClass("form-message--success");
        expect(message).not.toHaveClass("form-message--visible");
    });
});
