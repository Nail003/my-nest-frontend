import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginBanner from "../LoginBanner";

const logoText = "My Nest";
const paragraphText = "The hangout spot you always wanted";

describe("LoginBanner with no props", () => {
    beforeEach(() => {
        render(<LoginBanner />);
    });

    it("should render the title/logo heading", () => {
        const heading = screen.getByRole("heading", { name: logoText });

        expect(heading).toBeInTheDocument();
    });

    it("should render correct logo text in title/logo heading", () => {
        const heading = screen.getByRole("heading", { name: logoText });

        expect(heading.textContent).toMatch(logoText);
    });

    it("should render the banner paragraph", () => {
        const bannerPragraph = screen.getByText(paragraphText);

        expect(bannerPragraph).toBeInTheDocument();
    });

    it("should render correct paragraph text", () => {
        const bannerPragraph = screen.getByText(paragraphText);

        expect(bannerPragraph.textContent).toMatch(paragraphText);
    });
});
