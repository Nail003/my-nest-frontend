import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LoadingScreen from "../LoadingScreen";

vi.mock("../../LoaderCircle/LoaderCircle", () => ({
    default: (props) => <div {...props}>loader-circle</div>,
}));

describe("LoadingScreen Component", () => {
    it("renders the loading screen with LoaderCircle", () => {
        render(<LoadingScreen />);

        expect(screen.getByText("loader-circle")).toBeInTheDocument();
    });
});
