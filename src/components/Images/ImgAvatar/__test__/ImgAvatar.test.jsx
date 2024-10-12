import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ImgAvatar from "../ImgAvatar";

// Mock component
vi.mock("../../../Loaders", () => ({
    LoaderCircle: () => <div>loader-circle</div>,
}));

describe("ImgAvatar Component", () => {
    it("renders the loader when loading is true", () => {
        render(<ImgAvatar loading={true} />);

        expect(screen.getByText("loader-circle")).toBeInTheDocument();
    });

    it("does not render the image when loading is true", () => {
        render(<ImgAvatar loading={true} />);

        expect(screen.queryByRole("img")).toBeNull();
    });

    it("renders the image when loading is false", () => {
        const imgProps = {
            src: "avatar.jpg",
            alt: "Avatar Image",
        };

        render(<ImgAvatar loading={false} {...imgProps} />);

        const img = screen.getByRole("img");

        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", "avatar.jpg");
        expect(img).toHaveAttribute("alt", "Avatar Image");
    });
});
