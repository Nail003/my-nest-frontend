import { describe, expect } from "vitest";
import Page from "../Page";
import { render, screen } from "@testing-library/react";

vi.mock("../Page.module.css", () => {
    return { default: { page: "mocked-page-class" } };
});

describe("Page", () => {
    it("renders correctly", () => {
        render(<Page />);

        expect(screen.getByTestId("page")).toBeInTheDocument();
    });

    it("renders children correctly", () => {
        render(
            <Page>
                <div>child</div>
            </Page>
        );

        expect(screen.getByText("child")).toBeInTheDocument();
    });

    it("renders the default class", () => {
        render(<Page />);

        expect(screen.getByTestId("page")).toHaveClass("mocked-page-class");
    });

    it("renders additional passed classes correctly", () => {
        const additionalClasses = "additionalClasses";
        render(<Page className={additionalClasses} />);

        expect(screen.getByTestId("page")).toHaveClass("mocked-page-class");
        expect(screen.getByTestId("page")).toHaveClass(additionalClasses);
    });
});
