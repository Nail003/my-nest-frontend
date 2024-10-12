import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FormLinksContainer from "../FormLinksContainer";

describe("FormLinksContainer", () => {
    it("renders correctly", () => {
        render(<FormLinksContainer />);

        const container = screen.getByTestId("container");
        expect(container).toBeInTheDocument();
    });

    it("renders children correctly", () => {
        render(
            <FormLinksContainer>
                <span>Hello</span>
                <span>World</span>
            </FormLinksContainer>
        );

        expect(screen.getByText("Hello")).toBeInTheDocument();
        expect(screen.getByText("World")).toBeInTheDocument();
    });
});
