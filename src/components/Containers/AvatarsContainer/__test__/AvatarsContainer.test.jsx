import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import AvatarsContainer from "../AvatarsContainer";

describe("AvatarsContainer", () => {
    it("renders correctly", () => {
        render(<AvatarsContainer />);

        const container = screen.getByTestId("container");
        expect(container).toBeInTheDocument();
    });

    it("renders children correctly", () => {
        render(
            <AvatarsContainer>
                <span>Hello</span>
                <span>World</span>
            </AvatarsContainer>
        );

        expect(screen.getByText("Hello")).toBeInTheDocument();
        expect(screen.getByText("World")).toBeInTheDocument();
    });
});
