import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ButtonAvatar from "../ButtonAvatar";
import userEvent from "@testing-library/user-event";

vi.mock("../../../Images", () => {
    return {
        ImgAvatar: ({ src }) => {
            return <img src={src} />;
        },
    };
});

describe("ButtonAvatar with no props", () => {
    beforeEach(() => {
        render(<ButtonAvatar />);
    });

    it("should render the button", () => {
        const avatarButton = screen.getByRole("button");

        expect(avatarButton).toBeInTheDocument();
    });

    it("should render the ImgAvatar component", () => {
        const imgAvatar = screen.getByRole("img");

        expect(imgAvatar).toBeInTheDocument();
    });
});

describe("ButtonAvatar with src prop", () => {
    it("should render the ImgAvatar component with correct props", () => {
        const src = "some-path";
        render(<ButtonAvatar src={src} />);

        const imgAvatar = screen.getByRole("img");

        expect(imgAvatar.src).toMatch(src);
    });
});

describe("ButtonAvatar with avatar and setAvatar props", () => {
    const src = "some-path";
    let avatar = "some-avatar";
    const setAvatar = vi.fn().mockImplementation((newAvatar) => {
        avatar = newAvatar;
    });

    beforeEach(() => {
        render(
            <ButtonAvatar src={src} avatar={avatar} setAvatar={setAvatar} />
        );
    });

    it("should render the component with different src and avatar path", () => {
        expect(src).not.toBe(avatar);
    });

    it("should render the component with same src and avatar after clicking the button", async () => {
        const user = userEvent.setup();

        const avatarButton = screen.getByRole("button");

        await user.click(avatarButton);

        expect(src).toBe(avatar);
    });
});
