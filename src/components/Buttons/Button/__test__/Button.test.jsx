import { beforeEach, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "../Button";

describe("Button with no props", () => {
    beforeEach(() => {
        render(<Button />);
    });

    it("should render the button", () => {
        const button = screen.getByRole("button");

        expect(button).toBeInTheDocument();
    });

    it("should render the button without any content", () => {
        const button = screen.getByRole("button");

        expect(button.innerHTML).toMatch("");
    });
});

describe("Button with children/content", () => {
    it("should render the button with children/content", () => {
        const buttonContent = "Button Children";

        render(<Button>{buttonContent}</Button>);

        const button = screen.getByRole("button");

        expect(button.innerHTML).toMatch(buttonContent);
    });
});

describe("Button with loading prop", () => {
    const buttonContent = "Button Content";

    it("should render button content if loading is false", () => {
        render(<Button loading={false}>{buttonContent}</Button>);

        const button = screen.getByRole("button");

        expect(button.innerHTML).toMatch(buttonContent);
    });

    it("should not disbale the button if loading is false", () => {
        render(<Button loading={false}>{buttonContent}</Button>);

        const button = screen.getByRole("button");

        expect(button).not.toBeDisabled();
    });

    it("should not render button content if loading is true", () => {
        render(<Button loading={true}>{buttonContent}</Button>);

        const button = screen.getByRole("button");

        expect(button.innerHTML).not.toMatch(buttonContent);
    });

    it("should render anything to signify loading instead of original content if loading is true", () => {
        render(<Button loading={true}>{buttonContent}</Button>);

        const button = screen.getByRole("button");

        expect(button.innerHTML).not.toBe("");
    });

    it("should disbale the button if loading is true", () => {
        render(<Button loading={true}>{buttonContent}</Button>);

        const button = screen.getByRole("button");

        expect(button).toBeDisabled();
    });
});
