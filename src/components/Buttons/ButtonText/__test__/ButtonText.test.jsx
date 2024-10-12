import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ButtonText from "../ButtonText";
import React, { createRef } from "react";

describe("ButtonText", () => {
    it("renders correctly", () => {
        render(<ButtonText />);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    });

    it("renders the children correctly", () => {
        const children = "some content";
        render(<ButtonText>{children}</ButtonText>);

        const button = screen.getByRole("button");
        expect(button.innerHTML).toBe(children);
    });

    it("forwards the ref to the button element", () => {
        const ref = createRef();
        render(<ButtonText innerRef={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("forwards additional props to the button element", () => {
        render(<ButtonText aria-label="button-label" />);

        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("aria-label", "button-label");
    });
});
