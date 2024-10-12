import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Main } from "../..";

// Mock pages
vi.mock("../../../pages", () => ({
    Home: () => <div>home</div>,
    Login: () => <div>login</div>,
    Signup: () => <div>signup</div>,
    Redirect: () => <div>redirect</div>,
}));

describe("Main Component", () => {
    it("renders the Redirect page for the root route", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Main />
            </MemoryRouter>
        );

        expect(screen.getByText("redirect")).toBeInTheDocument();
    });

    it("renders the Login page for the /login route", () => {
        render(
            <MemoryRouter initialEntries={["/login"]}>
                <Main />
            </MemoryRouter>
        );

        expect(screen.getByText("login")).toBeInTheDocument();
    });

    it("renders the Signup page for the /signup route", () => {
        render(
            <MemoryRouter initialEntries={["/signup"]}>
                <Main />
            </MemoryRouter>
        );

        expect(screen.getByText("signup")).toBeInTheDocument();
    });

    it("renders the Home page for the /home route", () => {
        render(
            <MemoryRouter initialEntries={["/home"]}>
                <Main />
            </MemoryRouter>
        );

        expect(screen.getByText("home")).toBeInTheDocument();
    });

    it("renders the Home page for the /home/:chatName route", () => {
        render(
            <MemoryRouter initialEntries={["/home/:chatName"]}>
                <Main />
            </MemoryRouter>
        );

        expect(screen.getByText("home")).toBeInTheDocument();
    });
});
