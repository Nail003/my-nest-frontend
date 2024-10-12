import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Form from "../Form";
import userEvent from "@testing-library/user-event";

describe("Form", () => {
    it("renders correctly", () => {
        render(<Form />);

        const form = screen.getByTestId("form");
        expect(form).toBeInTheDocument();
    });

    it("renders children correctly", () => {
        render(
            <Form>
                <div>Hi</div>
            </Form>
        );

        const child = screen.getByText("Hi");
        expect(child).toBeInTheDocument();
    });

    it("passes className correctly", () => {
        render(<Form className="passed-class" />);

        const form = screen.getByTestId("form");
        expect(form).toHaveClass("passed-class");
    });

    it("passes additional props correctly", async () => {
        const user = userEvent.setup();
        const handleSubmit = vi.fn();

        render(
            <Form onClick={handleSubmit}>
                <button type="submit">Submit</button>
            </Form>
        );

        const submitButtom = screen.getByRole("button");

        await user.click(submitButtom);

        expect(handleSubmit).toHaveBeenCalledOnce();
    });
});
