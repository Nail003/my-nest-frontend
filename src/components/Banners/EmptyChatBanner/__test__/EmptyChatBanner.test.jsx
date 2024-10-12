import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import EmptyChatBanner from "../EmptyChatBanner";

const logoText = /my nest/i;
const defaultSubHeading = /send a message to break the ice/i;

describe("EmptyChatBanner with no props", () => {
    beforeEach(() => {
        render(<EmptyChatBanner />);
    });

    it("should render both the logo and sub heading", () => {
        const headings = screen.getAllByRole("heading");

        for (const heading of headings) {
            expect(heading).toBeInTheDocument();
        }
    });

    it("should render the correct default text for headings", () => {
        const headings = screen.getAllByRole("heading");

        expect(headings[0].textContent).toMatch(logoText);
        expect(headings[1].textContent).toMatch(defaultSubHeading);
    });
});

describe("EmptyChatBanner with text prop", () => {
    it("should render the same sub-heading text as provided in text prop", () => {
        const text = "Write a message";
        render(<EmptyChatBanner text={text} />);

        const heading = screen.getByRole("heading", { name: text });

        expect(heading.textContent).toMatch(text);
    });
});
