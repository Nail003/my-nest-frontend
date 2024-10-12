import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { ImgAvatar } from "../../../Images";
import { getUserAvatar } from "../../../../services/user";
import UserAvatar from "../UserAvatar";

// Mock component
vi.mock("../../../Images", () => ({
    ImgAvatar: ({ src, alt, loading }) => (
        <div>{loading ? "loading..." : <img src={src} alt={alt} />}</div>
    ),
}));

// Mock services
vi.mock("../../../../services/user", () => ({
    getUserAvatar: vi.fn(),
}));

describe("UserAvatar Component", () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    const renderComponent = (userName = "test-user") => {
        render(<UserAvatar userName={userName} />);
    };

    it("renders the loading state while fetching the avatar", () => {
        getUserAvatar.mockResolvedValue({
            ok: true,
            avatar: "test-avatar.png",
        });

        renderComponent();

        expect(screen.getByText("loading...")).toBeInTheDocument();
    });

    it("renders the avatar image after fetching the avatar", async () => {
        getUserAvatar.mockResolvedValue({
            ok: true,
            avatar: "test-avatar.png",
        });

        renderComponent();

        await waitFor(() => {
            const img = screen.getByRole("img");
            expect(img).toBeInTheDocument();
            expect(img).toHaveAttribute("src", "test-avatar.png");
            expect(img).toHaveAttribute("alt", "test-user");
        });
    });

    it("handles error during avatar fetching", async () => {
        getUserAvatar
            .mockResolvedValue(new Error("network-error"))
            .mockImplementation(() => {});
        const consoleErrorSpy = vi.spyOn(console, "error");

        renderComponent();

        await waitFor(() => {
            expect(screen.queryByText("loading...")).toBeNull();

            const img = screen.getByRole("img");
            expect(img).toBeInTheDocument();
            expect(img).toHaveAttribute("src", "");

            expect(consoleErrorSpy).toHaveBeenCalled();
        });
    });
});
