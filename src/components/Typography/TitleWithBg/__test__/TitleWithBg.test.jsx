import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TitleWithBg from "../TitleWithBg";

describe("TitleWithBg", () => {
    it("renders component correctly", () => {
        render(<TitleWithBg />);

        expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    it("renders children correctly", () => {
        render(<TitleWithBg>title</TitleWithBg>);

        expect(screen.getByText("title")).toBeInTheDocument();
    });
});
