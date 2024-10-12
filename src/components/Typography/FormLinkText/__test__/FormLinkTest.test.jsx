import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import FormLinkText from "../FormLinkText";

describe("FormLinkTest Component", () => {
    const mockChildText = "Don't have an account?";
    const mockLinkTest = "Sign up";
    const mockTo = "/signup";

    const renderComponent = () => {
        render(
            <MemoryRouter>
                <FormLinkText linkText={mockLinkTest} to={mockTo}>
                    {mockChildText}
                </FormLinkText>
            </MemoryRouter>
        );
    };

    it("renders children text correctly", () => {
        renderComponent();

        expect(screen.getByText(mockChildText)).toBeInTheDocument();
    });

    it("renders the link with correct text and href", () => {
        renderComponent();

        const link = screen.getByRole("link", { name: mockLinkTest });

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", mockTo);
    });
});
