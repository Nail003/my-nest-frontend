import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HeaderSubContainer from "../HeaderSubContainer";

describe("FormLinksContainer", () => {
    it("renders correctly", () => {
        render(<HeaderSubContainer />);

        const container = screen.getByTestId("container");
        expect(container).toBeInTheDocument();
    });

    it("renders children correctly", () => {
        render(
            <HeaderSubContainer>
                <span>Hello</span>
                <span>World</span>
            </HeaderSubContainer>
        );

        expect(screen.getByText("Hello")).toBeInTheDocument();
        expect(screen.getByText("World")).toBeInTheDocument();
    });
});
