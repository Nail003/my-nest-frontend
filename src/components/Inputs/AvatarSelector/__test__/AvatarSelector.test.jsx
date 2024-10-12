import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import AvatarSelector from "../AvatarSelector";
import { ButtonAvatar } from "../../../Buttons";
import { avatars } from "../../../../assets/avatars";

// Mock components
vi.mock("../../../Buttons", () => ({
    ButtonAvatar: ({ src }) => <button>{src}</button>,
}));

// Mock images
vi.mock("../../../../assets/avatars", () => ({
    avatars: ["avatar1.png", "avatar2.png", "avatar3.png", "avatar4.png"],
}));

describe("AvatarSelector Component", () => {
    it("renders the avatar selector component", () => {
        render(<AvatarSelector />);

        expect(screen.getByTestId("AvatarSelector")).toBeInTheDocument();
    });

    it("displays the title", () => {
        render(<AvatarSelector />);

        expect(screen.getByRole("heading", { name: /choose/i }));
    });

    it("renders ButtonAvatar when there are avatars available", () => {
        render(<AvatarSelector />);

        avatars.forEach((avatar) => {
            expect(
                screen.getByRole("button", { name: avatar })
            ).toBeInTheDocument();
        });
    });

    it("renders correct number of ButtonAvatars", () => {
        render(<AvatarSelector />);

        const buttons = screen.getAllByRole("button", { name: /avatar/i });
        expect(buttons.length).toBe(avatars.length);
    });
});
